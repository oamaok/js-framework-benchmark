import { h, createState, render } from 'kaiku'

function _random(max) {
  return Math.round(Math.random()*1000)%max;
}

const state = createState({
  selected: null,
  items: []
})

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]

let nextId = -1
const buildData = (count = 1000) => {
  const items = []
  for (let i = 0; i< count; i++) {
    items.push({
      id: ++nextId,
      label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]
    })
  }
  return items
}

const run = () => {
  state.items = buildData()
  state.selected = null
}

const runLots = () => {
  state.items = buildData(10000)
  state.selected = null
}

const add = () => {
  state.items.concat = state.items.concat(buildData())
}

const swapRows = () => {
  if (state.items.length > 998) {
    var tmp = state.items[1]
    state.items[1] = state.items[998]
    state.items[998] = tmp
  }
}

const removeItem = (id) => {
  state.items = state.items.filter((item) => item.id !== id)
}

const clear = () => {
  state.items = []
  state.selected = null
}

const update = () => {
  for (let i = 0; i < state.items.length; i += 10) {
    state.items[i].label += ' !!!'
  }
  state.selected = null
}

const select = (id) => {
  state.selected = id
}

const Button = ({ id, text, onClick }) => (
  <div class="col-sm-6 smallpad">
    <button id={id} class="btn btn-primary btn-block" type="button" onClick={onClick}>
      {text}
    </button>
  </div>
)

const Row = ({ item }) => {
  return (
    <tr className={() => ({ danger: item.id === state.selected })}>
      <td className="col-md-1"></td>
      <td className="col-md-4">{() => <a className="lbl" onClick={() => select(item.id)}>{item.label}</a>}</td>
      <td className="col-md-1">
        <a className="remove" onClick={() => removeItem(item.id)}>
          <span className="remove glyphicon glyphicon-remove" aria-hidden="true"></span>
        </a>
      </td>
      <td className="col-md-6"></td>
    </tr>
  )
}

const App = () => (
  <div className='container'>
    <div className='jumbotron'><div className='row'>
      <div className='col-md-6'><h1>Kaiku Keyed</h1></div>
      <div className='col-md-6'><div className='row'>
        <Button id='run' text='Create 1,000 rows' onClick={ run } />
        <Button id='runlots' text='Create 10,000 rows' onClick={ runLots } />
        <Button id='add' text='Append 1,000 rows' onClick={ add } />
        <Button id='update' text='Update every 10th row' onClick={ update } />
        <Button id='clear' text='Clear' onClick={ clear } />
        <Button id='swaprows' text='Swap Rows' onClick={ swapRows } />
      </div></div>
    </div></div>
    <table className='table table-hover table-striped test-data'><tbody>
      {state.items.map(item => <Row key={item.id} item={item} />)}
    </tbody></table>
    <span className='preloadicon glyphicon glyphicon-remove' aria-hidden="true" />
  </div>
)
  
render(App, document.querySelector("#main"), state)
