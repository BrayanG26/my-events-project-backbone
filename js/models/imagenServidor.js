/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    app.ImagenServidor = Backbone.Model.extend({
        // urlRoot: function() {
        //     return "http://localhost:3000/api/eventos";
        // },
        // url: function() {
        //     return this.urlRoot() +'/'+ this.id;
        // },
        // idAttribute: 'id',
        initialize: function() {
            console.log('Imagen obtenida del servidor');
        },
        // Default attributes for the image
        defaults: {
            url: '',
            name:'',
            cover:false
        }
    });
})();