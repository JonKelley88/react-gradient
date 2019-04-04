// gulp (watch) : for development and livereload
// gulp build : for a one off development build
// gulp build --production : for a minified production build
const argv = require('yargs').argv;
const env = require('gulp-env');
const production = !!argv.production;
const build = argv._.length ? argv._[0] === 'build' : false;
const watch = argv._.length ? argv._[0] === 'watch' : false;

// set the gulp environment
env({
	vars: {
		NODE_ENV: production ? 'production' : 'development'
	}
});

module.exports = {
	production,
	watch,
	build
};