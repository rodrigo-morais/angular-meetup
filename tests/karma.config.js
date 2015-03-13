// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
    'use strict';
    var bower = 'vendor/';
    var configuration = {
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // base path, that will be used to resolve files and exclude
        basePath: '../',
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        //browsers: ['PhantomJS'],
        browsers: ['Chrome', 'ChromeCanary'],
        customLaunchers: {
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },
        // list of files / patterns to load in the browser
        files: [
            bower + 'angular/angular.js',
            bower + 'angular-mocks/angular-mocks.js',
            bower + 'angular-sanitize/angular-sanitize.js',
            bower + 'angular-resource/angular-resource.js',
            bower + 'jquery/dist/jquery.js',
            'dist/angular-meetup.js',
            'tests/unit/**/*.js'
        ],
        exclude: [
            'component/templates/templates.js'
        ],
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        // web server port
        port: 8999,
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        reporters: ['progress', 'coverage'],
        // preprocessors
        preprocessors: {
            'component/**/*.js': ['coverage']
        },
            // configure the reporter
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage/'
        }
    };

    if(process.env.TRAVIS){
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};