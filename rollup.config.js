const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const uglifyEs = require('rollup-plugin-uglify-es');
const resolve = require('rollup-plugin-node-resolve');
let input = 'src/index.js';
const external = ['tiny-uri'];
const globals = {
  'tiny-uri': "TinyUri"
};

export default [
  {
    external,
    input,
    plugins: [buble()],
    output: {
      name: 'SUtils',
      file: 'dist/s-utilities.iife.js',
      format: 'iife',
      globals
    }
  },
  {
    external,
    input,
    plugins: [buble(), uglify()],
    output: {
      name: 'SUtils',
      file: 'dist/s-utilities.iife.min.js',
      format: 'iife',
      globals
    }
  },
  {
    external,
    input,
    output: {
      file: 'dist/s-utilities.mjs',
      format: 'es'
    }
  },
  {
    input,
    plugins: [resolve()],
    output: {
      file: 'dist/s-utilities.test.mjs',
      format: 'es'
    }
  },
  {
    external,
    input,
    plugins: [uglifyEs()],
    output: {
      file: 'dist/s-utilities.min.mjs',
      format: 'es'
    }
  },
  {
    external,
    input,
    output: {
      file: 'index.js',
      format: 'cjs'
    }
  }
];
