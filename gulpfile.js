const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat-util');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence')

var distPath = './dist';

gulp.task('copy-assets', function () {
    return gulp.src(['./app/assets/*.*'])
    .pipe(gulp.dest('./docs/assets/'));
});

gulp.task('copy-vendor', function () {
    return gulp.src(['./vendor/ui/*.*'])
    .pipe(gulp.dest('./docs/ui/'));
});

gulp.task('copy-html', function () {
    return gulp.src(['./index.html'])
    .pipe(replace('dist/', ''))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('copy-js', function () {
    return gulp.src(['./dist/js/main.js'])
    .pipe(gulp.dest('./docs/js/'));
});

gulp.task('copy-css', function () {
    return gulp.src(['./dist/css/main.css'])
    .pipe(gulp.dest('./docs/css/'));
});

gulp.task('clean', function () {
    return gulp.src('./docs/')
    .pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/main.scss')
    .pipe(sass({
        //outputStyle: 'compressed', 
        includePaths:['./app/sass/']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(distPath+'/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('concat', function() {
    return gulp.src(['./app/js/Carrossel.js','./app/js/Tab.js','./app/js/Form.js','./app/js/Main.js'])
    .pipe(concat('main.js'))
    .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
    .pipe(concat.footer('\n})(window, document);\n'))
    .pipe(gulp.dest(distPath+'/js/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('build-html', function(){
    return gulp.src('./docs/*.html')
    .pipe(useref())
    .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./docs'))
});

gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir:'./'
        }
    });
    
    gulp.watch('./app/js/*.js', ['concat']);
    gulp.watch('./app/sass/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

/*
*
* Task for copy all assets
*
*/

gulp.task('copy', [
    'sass',
    'concat',
    'copy-assets', 
    'copy-vendor', 
    'copy-html', 
    'copy-js', 
    'copy-css'
]);

/*
*
* Default task
*
*/

gulp.task('default', [
    'dev'
]);

/*
*
*  Task for build page
*
*/

gulp.task('build', gulpSequence('clean', 'copy', 'build-html'));

/*
*
*  Task for development
*
*/

gulp.task('dev', [
    'sass', 
    'concat',
    'copy-vendor',
    'server'
]);
