'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        this.sourceApp = this.source + 'app/';
        this.allTypeScript = this.sourceApp + '**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';

        this.sourceSass = this.source + 'scss/';
        this.allSass = this.sourceSass + '**/*.scss';

        this.dist = './dist/';
        this.tsOutputPath = this.dist + 'js/';
        this.cssOutputPath = this.dist + 'css/';

        this.allJavaScript = [this.tsOutputPath + '**/*.js'];
        this.allCss = [this.cssOutputPath + '**/*.css'];

    }
    return gulpConfig;
})();
module.exports = GulpConfig;