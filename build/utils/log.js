const through = require('through2');
const gulpUtil = require('gulp-util');

const beep = () => gulpUtil.beep();

const log = function(message) {
	return through.obj(function(file, enc, callback) {
		this.push(file);

		gulpUtil.log(message);
		callback();
	});
};

const color = function(color) {
	return function(message) {
		return gulpUtil.colors[color](message);
	};
};

module.exports = Object.assign(log, {
	message(message) {
		return gulpUtil.log(message);
	},

	err(message) {
		return e => {
			gulpUtil.log(message);
			beep();
			throw e;
		};
	},

	// all available text colors
	black:   color('black'),
	red:     color('red'),
	green:   color('green'),
	yellow:  color('yellow'),
	blue:    color('blue'),
	magenta: color('magenta'),
	cyan:    color('cyan'),
	white:   color('white'),
	gray:    color('gray'),

	beep
});