const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // после компиляции сразу переименую
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel('sass'));
    gulp.watch("src/sass/*.+(scss|sass)").on("change", browserSync.reload);
    gulp.watch('src/*.html').on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'sass'));