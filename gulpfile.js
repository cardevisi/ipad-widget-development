const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');

var distPath = './dist';

gulp.task('copy-assets', function () {
    return gulp.src(['./app/assets/*.*'])
    .pipe(gulp.dest('./build/assets/'))
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('copy-vendor', function () {
    return gulp.src(['./vendor/ui/*.*'])
    .pipe(gulp.dest(distPath+'/ui/'));
});

gulp.task('copy-html', function () {
    return gulp.src(['./app/index.html'])
    .pipe(gulp.dest(distPath+'/'));
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(distPath+'/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('concat', function() {
    return gulp.src('./app/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(distPath+'/js/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('build-html', function(){
    return gulp.src(distPath+'/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./build/'))
});

gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir:'./dist/'
        }
    });
    
    gulp.watch('./app/js/*.js', ['concat']);
    gulp.watch('./app/sass/*.scss', ['sass']);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});


gulp.task('copy', ['copy-assets', 'copy-vendor', 'copy-html']);
gulp.task('default', ['copy', 'sass', 'concat', 'build-html', 'server']);
gulp.task('dev', ['sass', 'concat','server']);
