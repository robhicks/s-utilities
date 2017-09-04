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
    name: 'RHUtils',
    output: {
      file: 'dist/utilities.iife.js',
      format: 'iife'
    }
  },
	{
		input,
		plugins,
		globals,
    output: {
      file: 'dist/utilities.es.js',
      format: 'es'
    }
  },
	{
		input,
		plugins,
		globals,
    output: {
      file: 'dist/utilities.cjs.js',
      format: 'cjs'
    }
  }
];
