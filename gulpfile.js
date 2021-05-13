const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const minify = require('gulp-minify');
const inject = require('gulp-inject-string');

const distStyles = `styles-${Date.now().toString()}.css`;

gulp.task('clean', () => del(['dist']));

gulp.task('css', (done) => {
    gulp.src(['css/reset.css', 'css/main.css', 'css/infoText.css', 'css/contactForm.css', 'css/footer.css', 'css/responsive.css'])
        .pipe(concat(distStyles))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
    gulp.src('index.html')
        .pipe(inject.replace(/styles-\d{13}.css/, distStyles))
        .pipe(gulp.dest('./'));
    done();
});

gulp.task('default', gulp.series('clean', 'css', (done) => {
    gulp.src(['src/validation.js', 'src/form.js', 'src/send.js'])
        .pipe(concat('scripts.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
    done();
}));
