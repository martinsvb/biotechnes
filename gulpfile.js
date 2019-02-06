const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('clean', () => del(['dist']));

gulp.task('default', gulp.series('clean', (done) => {
    gulp.src(['src/validation.js', 'src/form.js', 'src/send.js'])
        .pipe(concat('scripts.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
    done();
}));
