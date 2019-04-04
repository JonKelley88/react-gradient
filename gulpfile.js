const gulp = require('gulp');
const styles = require('./build/styles');

gulp.task('styles', function() {
	return styles.run({
		source: './styles/index.scss',
		dest: './public',
		map: './maps',
		file: 'site.css',
		watch: './styles/**/*.scss'
	});
});

gulp.task('watch',
	gulp.parallel(
		'styles'
	)
);