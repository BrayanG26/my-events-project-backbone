/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    // Evento Model
    // ----------
    app.Evento = Backbone.Model.extend({
        // _organizador:'',
        url: function() {
            return app.urlAPI + 'eventos/' + this.id;
        },
        idAttribute: 'id',
        initialize: function() {
            console.log('Objeto tipo evento, creado');
        },
        // Default attributes for the event
        // and ensure that each event created has `title`.
        defaults: {
            organizador: '',
            nombreEvento: '',
            lugar: '',
            fecha: '',
            hora: '',
            ciudad: '',
            capacidad: '',
            categoria: '',
            costo: '0',
            descripcion: '',
            estado: 'creado'
        }
    });
})();