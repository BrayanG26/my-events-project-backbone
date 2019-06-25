/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // Evento Model
    // ----------
    app.Evento = Backbone.Model.extend({
        urlRoot: function () {
            return "http://localhost:3000/api/eventos";
        },
        // url: function() {
        //     return this.urlRoot() +'/'+ this.id;
        // },
        idAttribute: 'id',
        initialize: function () {
            console.log('Objeto tipo evento, creado');
        },

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
            sePaga: '',
            descripcion: '',
            asistentes: 0,
            meinteresa: 0,
            compartido: 0,
            megusta: 0,
            estado: 'creado',
            imagenes: []
        },

        validation: {
            nombre: {
                required: true
            },
            lugar: {
                required: true
            },
            fecha: {
                required: true
            },
            hora: {
                required: true
            },
            ciudad: {
                required: true
            },
            capacidad: {
                required: true
            },
            categoria: {
                required: true
            },
            url: {
                pattern: 'url',
                msg: 'Please enter a valid url'
            }
        }
    });
})();