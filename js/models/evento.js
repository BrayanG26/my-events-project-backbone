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
            sePaga: '',
            descripcion: '',
            asistentes: 0,
            meinteresa: 0,
            compartido: 0,
            megusta: 0,
            estado: 'creado',
            calificacion: {
                logistica: 0,
                comodidad: 0,
                entretenido: 0,
                interesante: 0
            },
            portada: "",
            imagenes: []
        }
    });
})();