const pack = require('./build/pack');

module.exports = pack({
	dev: true,
	entry: {
		'js/site': './gh-pages/index.js',
	},
});