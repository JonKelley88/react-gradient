import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

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
		uglify
	],
	output: {
		format: 'esm',
		name: 'react-gradient',
		globals: {
			react: 'React'
		}
	}
};

export default config;