import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

const extensions = ['.js', '.jsx'];

const config = {
	input: 'src/index.js',
	external: ['react'],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			
		}),
		resolve({
			extensions,
		}),
		commonjs(),
		minify({
			comments: false
		})
	],
	output: {
		format: 'umd',
		name: 'react-gradient',
		globals: {
			react: 'React'
		}
	}
};

export default config;