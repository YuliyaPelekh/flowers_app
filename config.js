module.exports = {
    src: {
        scss: ['app/**/*.scss', 'app/*.scss'],
        js: 'app/app.module.js',
        jsReload: 'app/**/*.js',
        html: 'app/**/*.html'
    },
    dest: {
        css: 'build/css/',
        js: 'build/js/',
        nameJsBuildFile: 'main.js'
    },
     browserSyncConfig: {
        server: './',
        host: 'localhost',
        port: 3000
    },
    browserify: {
        debug: true
    },
    babelify: {
        compact: false,
        presets: [
            'es2015'
        ],
        sourceMaps: false
    },
    uglifyify: {
        global: true
    },
    maps: '../maps/'
}