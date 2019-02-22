import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize'
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser"
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: [
			{
				name: 'flip',
				file: pkg.browser,
				format: 'umd'
			},
			{ 
				file: pkg.module, 
				format: 'es'
			}
		],
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			terser(),
      filesize()
		]
	}
];
