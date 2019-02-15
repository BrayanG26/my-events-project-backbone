/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // Indicador Model
    // ----------

    //
    app.Indicador = Backbone.Model.extend({

        initialize: function () {
            console.log('a indicador object was created');
        },
        // Default attributes for the event
        // and ensure that each event created has `title` and `completed` keys.
        defaults: {
            nombre: '',
            valor: '',
            unidad: ''
        }
    });

})();

