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
        parse: function(response) {
            // console.log(response);
            var e;
            if (response.evento) {
                e = response.evento;
            } else {
                e = response;
            }
            return e;
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
            estado: 'creado',
            asistentes: 0,
            meinteresa: 0,
            compartido: 0,
            megusta: 0,
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
                required: true,
                pattern: /^[1-9]\d*$/
            },
            categoria: {
                required: true
            },
            url: {
                required: false,
                pattern: 'url',
                msg: 'Please enter a valid url'
            }
        }
    });
})();