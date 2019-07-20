var app = app || {};


app.Organizador = Backbone.Model.extend({
    url: function () {
        return app.urlAPI + 'organizadores/' + this.id;
    },
    idAttribute: 'id',
    initialize: function () {
        console.log('a usuario object was created');
    },
    parse: function (response) {
        return response.organizador;
    },
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
        email: '',
        usuario: '',
        password: '',
        nombres: '',
        apellidos: '',
        organizacion: ''
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

(function () {
    'use strict';

    // Organizador Model
    // ----------

})();