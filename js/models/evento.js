/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Evento Model
	// ----------
	
})();
app.Evento = Backbone.Model.extend({
	initialize: function () {
		console.log('a evento object was created');
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
		descripcion: '',
		estado: 'creado'
	},

	// Toggle the `completed` state of this todo item.
	toggle: function () {
		this.save({
			completed: !this.get('completed')
		});
	}
});
