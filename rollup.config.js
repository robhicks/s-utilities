const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
let input = 'src/index.js';
let globals = [];
let plugins = [buble()];

export default [
  {
		input,
		plugins,
		globals,
    name: 'SUtils',
    output: {
      file: 'dist/s-utilities.iife.js',
      format: 'iife'
    }
  },
	{
		input,
		plugins,
		globals,
    output: {
      file: 'dist/s-utilities.es.js',
      format: 'es'
    }
  },
	{
		input,
		plugins,
		globals,
    output: {
      file: 'dist/s-utilities.cjs.js',
      format: 'cjs'
    }
  }
];
