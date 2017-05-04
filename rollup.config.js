const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');

module.exports = {
	entry: 'src/index.js',
	external: [],
	globals: {
	},
	plugins: [
		buble()
		// uglify()
	],
	targets: [
		{
			dest: 'dist/utilities.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/utilities.es.js',
			format: 'es',
		},
		{
			dest: 'dist/utilities.iife.js',
			format: 'iife',
			moduleName: 'RHUtils'
		}
	]
};
