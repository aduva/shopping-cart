'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    url = require('url'),
    proxy = require('proxy-middleware'),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json"),
    tslint = require('gulp-tslint'),
    historyApiFallback = require('connect-history-api-fallback'),
    merge = require('merge2'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        app: 'build/app/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        plugins: 'build/plugins/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/**/*.html',
        app: 'src/app/**/*.ts',
        tmp: ['src/templates'],
        js: 'src/assets/js/**/*.js',
        scss: ['src/assets/style/main.scss', 'src/app/**/*.scss'],
        css: 'src/assets/style/**/*.css',
        img: 'src/assets/img/**/*.*',
        plugins: 'src/assets/plugins/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        app: 'src/app/**/*.ts',
        js: 'src/assets/js/**/*.js',
        css: 'src/assets/style/**/*.css',
        style: ['src/assets/style/**/*.css', 'src/**/*.scss', 'src/assets/style/main.scss'],
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    clean: './build'
};

var proxyHosts = {
    localhost: 'http://localhost:8080'
}

var proxyOptions = url.parse(proxyHosts.localhost);
proxyOptions.route = '/api/';

var config = {
    server: {
        baseDir: "./build",
        middleware: [proxy(proxyOptions), historyApiFallback()]
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Angular 2 Shopping Cart",
    ghostMode: false
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    let scssStream = gulp.src(path.src.scss)
        .pipe(sass())
        .pipe(concat('scss-files.scss'))
    ;

    let cssStream = gulp.src(path.src.css)
        .pipe(concat('css-files.css'))
    ;

    var mergedStream = merge(scssStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));

    return mergedStream;
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        /*.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))*/
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('plugins:build', function() {
    gulp.src(path.src.plugins)
        .pipe(gulp.dest(path.build.plugins));
});

gulp.task('app:lint', function() {
    gulp.src(path.src.app)
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task('app:libs', function() {
    gulp.src([
        'node-forge/js/forge.min.js',
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'typescript/**',
        'angular2-in-memory-web-api/**',
        'zone.js/dist/**',
        '@ngrx/**',
        '@angular/**'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
    .pipe(gulp.dest("build/js/lib"));

    gulp.src('systemjs.config.js').pipe(gulp.dest('build/js/lib'));
});

gulp.task('app:bowers', function() {
    gulp.src('bower_components/**/*') /* Glob required here. */
    .pipe(gulp.dest("build/bower_components/"));
});

gulp.task('app:build', ['app:lint', 'app:libs', 'app:bowers'], function() {
    let tsres = gulp.src(path.src.app)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    tsres.js
        .pipe(sourcemaps.write('.', {sourceRoot: '/src/app'}))
        .pipe(gulp.dest(path.build.app))
});

gulp.task('build', [
    'app:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'plugins:build',
    'image:build'
]);

gulp.task('watch', function(){
     watch([path.watch.app], function(event, cb) {
        gulp.start('app:build');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch(path.watch.style, function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
