var gulp = require('gulp');
var del = require('del');
var plug = require('gulp-load-plugins')();

var jsLibraries = [
    './App/JavaScript/Libraries/Angular/angular.js',
    './App/JavaScript/Libraries/Angular/angular-route.js',
    './App/JavaScript/Libraries/Angular/angular-animate.js',
    './App/JavaScript/Libraries/Angular/angular-ui-bootstrap.min.js',
    './App/JavaScript/Libraries/Angular/paging.min.js'
];

var jsSource = [
    './App/JavaScript/Src/**/*.js'
];

var cssSource = [
    './App/Content/css/**/*.css'
];

var templatesSource = [
    './App/Templates/**/*.html'
];

var imagesSource = [
    './App/Content/Images/*.png'
];

var compiledTemplates = [
    './Build/Templates/templates.js'
];

gulp.task('template', function() {
    return gulp.src(templatesSource)
        .pipe(plug.angularTemplatecache())
        .pipe(gulp.dest('Build/Templates'));
});

gulp.task('image', function() {
    return gulp.src(imagesSource)
        .pipe(gulp.dest('Build/Images/'));
});

gulp.task('css', function() {
    return gulp
        .src(cssSource)
        .pipe(gulp.dest('./Build/Css'))
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(plug.minifyCss())
        .pipe(gulp.dest('./Build/Css'));
});

gulp.task('js', function() {
    return gulp
        .src(jsLibraries.concat(jsSource).concat(compiledTemplates))
        .pipe(plug.concat('all.js'))
        .pipe(gulp.dest('./Build/Js'))
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(plug.uglify({ mangle: true }))
        .pipe(gulp.dest('./Build/Js'));
});

gulp.task('clean', function(cb) {
    del([
    './Build/Css/**',
    './Build/Js/**',
    ], cb);
});

gulp.task('watch', function() {
    gulp.watch(templatesSource, ['template', 'js']);
    gulp.watch(cssSource, ['css']);
    gulp.watch(jsSource, ['js']);
});

gulp.task('build', ['clean', 'image', 'template', 'js', 'css']);

var catchError = function(err) {
    console.log(err);
    this.emit('end');
};