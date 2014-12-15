"use strict";

// Include Gulp & Tools We"ll Use
var gulp = require("gulp"),
    webserver = require('gulp-webserver'),
    uglify = require("gulp-uglify"),
    changed = require("gulp-changed"),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require("gulp-minify-css"),
    size = require("gulp-size"),
    concat = require("gulp-concat"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    jade = require("gulp-jade"),
    less = require("gulp-less"),
    sass = require("gulp-sass"),
    minifyHTML = require("gulp-minify-html"),
    glob = require("glob"),
    uncss = require("gulp-uncss"),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    opts = {
        path: function(path) { return __dirname + (path.charAt(0) === "/" ? "" : "/") + path; },
        uncss: { html: glob.sync("app/**/*.html") },
        size: { showFiles: true, gzip: true },
        html: { empty: true },
        autoprefixer: { browsers: ['last 2 versions'], cascade: true },
        css: { keepBreaks: false },
        clean: {force: true},
        webserver: {
            livereload: true,
            directoryListing: false,
            open: false,
            fallback: "index.html"
        }
    };

gulp.task("jshint", function () {
    return gulp.src("src/js/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task("images", function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("app/img"))
        .pipe(size(opts.size));
});

gulp.task("jade", function () {
    var DEST = opts.path("src/html"),
        SRC = opts.path("src/jade/**/*.jade");
    return gulp.src(SRC)
        .pipe(changed(DEST, { extension: ".html" }))
        .pipe(jade())
        .pipe(size(opts.size))
        .pipe(gulp.dest(DEST));
});

gulp.task("html", function() {

    var SRC = opts.path("src/html/**/*.html"),
        DEST = opts.path("app");

    return gulp.src(SRC)
        .pipe(changed(DEST))
        .pipe(minifyHTML(opts.html))
        .pipe(gulp.dest(DEST));
});

gulp.task("less", function () {

    var SRC = opts.path("src/less/**/*.less"),
        DEST = opts.path("src/css");

    return gulp.src(SRC)
        .pipe(less())
        .pipe(autoprefixer(opts.autoprefixer))
        .pipe(gulp.dest(DEST))
        .pipe(size(opts.size));

});

gulp.task("sass", function() {
    var SRC = opts.path("src/sass/**/*.scss"),
        DEST = opts.path("src/css");

    return gulp.src(SRC)
        .pipe(sass())
        .pipe(autoprefixer(opts.autoprefixer))
        .pipe(uncss(opts.uncss))
        .pipe(gulp.dest(DEST));
});

gulp.task("assets", function() {

    var SRC = opts.path("src/assets/**/*"),
        DEST = opts.path("app");

    return gulp.src(SRC)
        .pipe(changed(DEST))
        .pipe(gulp.dest(DEST));

});

gulp.task("css", function() {

    var SRC = [
            opts.path("src/components/fontawesome/css/font-awesome.min.css"),
            opts.path("src/components/angular-material/angular-material.css"),
            opts.path("src/components/angular-material/themes/**/*.css"),
            opts.path("src/css/**/*.css")
        ],
        DEST = opts.path("app/css");

    return gulp.src(SRC)
        .pipe(autoprefixer(opts.autoprefixer))
        .pipe(concat("app.css"))
        //.pipe(uncss(opts.uncss))
        .pipe(minifyCSS(opts.css))
        .pipe(gulp.dest(DEST));

});

gulp.task("js:all", function() {
    var SRC = [
            opts.path("src/components/jquery/dist/jquery.min.js"),
            opts.path("src/components/hammerjs/hammer.min.js"),
            opts.path("src/components/angular/angular.min.js"),
            opts.path("src/components/angular-route/angular-route.min.js"),
            opts.path("src/components/angular-animate/angular-animate.min.js"),
            opts.path("src/components/angular-sanitize/angular-sanitize.min.js"),
            opts.path("src/components/angular-touch/angular-touch.min.js"),
            opts.path("src/components/angular-aria/angular-aria.min.js"),
            opts.path("src/components/angular-material/angular-material.min.js"),
            opts.path("src/js/kendo.ui.core.min.js"),
            opts.path("src/js/app.js")
        ],
        DEST = opts.path("app/js");

    return gulp.src(SRC)
        .pipe(concat("app.js"))
        //.pipe(uglify())
        .pipe(gulp.dest(DEST));

});

gulp.task("webserver", function() {
    console.log("Serving from " + opts.path("app"))
    return gulp.src(opts.path("app"))
        .pipe(webserver(opts.webserver));
});

gulp.task("test", ["jshint"]);

gulp.task("watch", ["webserver"], function () {
    gulp.watch(["src/html/**/*.html"], function() {
        // Since the css task uses uncss, we should re-run
        // it after changing html, since their related.
        runSequence("html", "css");
    });
    gulp.watch(["src/css/**/*.css"], ["css"]);
    gulp.watch(["src/less/**/*.less"], ["less"]);
    gulp.watch(["src/sass/**/*.scss"], ["sass"]);
    gulp.watch(["src/jade/**/*.jade"], ["jade"]);
    gulp.watch(["src/js/**/*.js"], ["js:all"]);
    gulp.watch(["src/img/**/*"], ["images"]);
    gulp.watch(["src/assets/**/*"], ["assets"]);
});

gulp.task("clean", function() {
    return gulp.src(opts.path("app"), {read: false})
        .pipe(clean(opts.clean));
});

gulp.task("build", function() {
    return runSequence(["less", "sass", "jade", "js:all", "images"], "html", ["css", "assets"]);
});

gulp.task("default", function() {
    runSequence("build", "watch");
});
