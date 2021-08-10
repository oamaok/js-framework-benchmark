const esbuild = require('esbuild')
esbuild.buildSync({
  entryPoints: ['src/index.jsx'],
  outfile: 'dist/main.js',
  bundle: true,
  jsxFactory: 'h',
  //minify: process.env.NODE_ENV === 'production',
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  }
})