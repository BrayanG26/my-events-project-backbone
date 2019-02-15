/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Usuario = Backbone.Model.extend({
		initialize:function(){
			console.log('a usuario object was created');
		},
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			email:'',
			password:'',
			imgUser:''
		}
	});
})();
