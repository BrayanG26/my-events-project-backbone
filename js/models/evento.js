/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    // Evento Model
    // ----------
    app.Evento = Backbone.Model.extend({
        url: function() {
            return "http://localhost:3000/api/eventos/" + this.id;
        },
        initialize: function() {
            console.log('Objeto tipo evento, creado');

        },
        // Default attributes for the event
        // and ensure that each event created has `title` and `completed` keys.
        defaults: {
            emailOrganizador: '',
            nombreEvento: '',
            lugar: '',
            fecha: '',
            hora: '',
            ciudad: '',
            capacidad: '',
            categoria:'',
            costo: '0',
            descripcion: '',
            estado: 'creado'
        }
    });
})();