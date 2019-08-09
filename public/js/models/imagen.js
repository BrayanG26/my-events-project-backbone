/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    // Image Model to upload 
    // ----------
    app.Imagen = Backbone.Model.extend({
        // urlRoot: function() {
        //     return "http://localhost:3000/api/eventos";
        // },
        // url: function() {
        //     return this.urlRoot() +'/'+ this.id;
        // },
        // idAttribute: 'id',
        initialize: function() {
            console.log('Objeto tipo imagen, creado');
        },
        // Default attributes for the event
        // and ensure that each event created has `title`.
        defaults: {
            url: '',
            alt: '',
            cover: false,
            file: null
        },
        setAsCover: function() {
            this.set({ cover: true });
            return this.toJSON();
        },
        removeAsCover: function() {
            this.set({ cover: false });
            return this.toJSON();
        }
    });
})();