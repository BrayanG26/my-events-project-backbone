/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    // Evento Model
    // ----------
    app.Evento = Backbone.Model.extend({
        urlRoot: function() {
            return "http://localhost:3000/api/eventos";
        },
        // url: function() {
        //     return this.urlRoot() +'/'+ this.id;
        // },
        idAttribute: 'id',
        initialize: function() {
            console.log('Objeto tipo evento, creado');
        },
        // Default attributes for the event
        // and ensure that each event created has `title`.
        defaults: {
            organizador: '',
            nombre: '',
            lugar: '',
            fecha: '',
            hora: '',
            ciudad: '',
            capacidad: '',
            categoria: '',
            url: '',
            costo: '0',
            descripcion: '',
            estado: 'creado'
        }
    });
})();