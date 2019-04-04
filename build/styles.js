const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-cssnano');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const log = require('./utils/log');
const {
	watch,
	production
} = require('./env');

module.exports = {
	run(opts) {
		const build = function() {
			return gulp.src(opts.source)
				.on('error', log.err(log.red('err: styles')))
				.pipe(sourcemaps.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(gulpif(production, minify()))
				.pipe(rename(opts.file))
				.pipe(sourcemaps.write(opts.map))
				.pipe(gulp.dest(opts.dest))
				.pipe(log(`${log.green('success:')} ${opts.file}`));
		};

		if (watch) {
			gulp.watch(opts.watch, build);
			log.message(log.green('watching styles'));
		}

		return build();
	}
};