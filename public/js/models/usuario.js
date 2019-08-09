var app = app || {};


app.Organizador = Backbone.Model.extend({
    url: function() {
        return app.urlAPI + 'organizadores/' + this.id;
    },
    idAttribute: 'id',
    initialize: function() {
        console.log('a usuario object was created');
    },
    parse: function(response) {
        var organizador;
        if(response.organizador){
            organizador = response.organizador;
        }
        return organizador;
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
        email: {
            required: true
        },
        nombres: {
            required: true
        },
        apellidos: {
            required: true
        },
        organizacion: {
            required: true
        }
    }
});

(function() {
    'use strict';

    // Organizador Model
    // ----------

})();