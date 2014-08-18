/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/lodash/dist/lodash',
        backbone: '../bower_components/backbone/backbone',
        mustache: '../bower_components/mustache/mustache',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    'views/exercise',
    'bootstrap'
], function (Backbone, ExerciseView) {

    // Application Class Constructor
    function ExerciseApp(){

        // Global event manager
        this.bus = _.extend({}, Backbone.Events);
    }

    ExerciseApp.prototype.initialize = function(){

        //assigning a model to the View.
        var exerciseView = new ExerciseView();

        //appending to the DOM
        $('body').append(exerciseView.render().el);
    };

    //boosting up the App to the browser.
    Window.App = new ExerciseApp();
    Window.App.initialize();
});






