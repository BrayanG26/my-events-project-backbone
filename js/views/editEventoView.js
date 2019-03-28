/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function($) {
    'use strict';

    // Vista para editar evento
    // --------------

    // The DOM element for a todo item...
    app.EditEventoView = Backbone.View.extend({
        //... is a list tag.
        tagName: 'div',
        className: 'contenedor-formulario',

        // Cache the template function for a single item.
        editTemplate: _.template($("#event-edit-template").html()),

        // The DOM events specific to an item.
        events: {
            'click .enable-edit': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
            'submit #edit-event': 'save',
            'click input[type=button]': 'returnHome'
        },

        // The TodoView listens for changes to its model, re-rendering. Since
        // there's a one-to-one correspondence between a **Todo** and a
        // **TodoView** in this app, we set a direct reference on the model for
        // convenience.
        initialize: function() {
            console.log(this.model);
            this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the todo item.
        render: function() {
            this.$el.html(this.editTemplate(this.model.attributes));
            this.$editInput = this.$('.edit');
            return this;
        },
        bindValidations: function() {
            $.validate({
                modules: 'security, toggleDisabled',
                lang: 'en',
                errorMessagePosition: 'top',
            });
        },



        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function(e) {
            console.log("click on edit event");
            console.log(e.target);
            $(e.target).parents().eq(1).addClass('editing');
            // console.log(this.$editInput);
            this.$editInput.focus();
            // this.$(e.target).attr("readonly", false);
            // console.log("dblclick detected");
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function(e) {
            // console.warn(e.target);
            console.log("blur event");
            console.warn($(e.target));
            var propiedad = $(e.target).attr("name"),
                valor = $(e.target).val().trim();
            console.log(`${propiedad} : ${valor}`);
            this.model.set(propiedad, valor);
            $(e.target).parents().eq(0).removeClass('editing');
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
            var ENTER_KEY = 13;
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // If you're pressing `escape` we revert your change by simply leaving
        // the `editing` state.
        revertOnEscape: function(e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                // Also reset the hidden input back to the original value.
                this.$input.val(this.model.get('title'));
            }
        },

        // Remove the item, destroy the model from *localStorage* and delete its view.
        clear: function() {
            this.model.destroy();
        },
        save: function(e) {
            e.preventDefault();
            var self = this;
            console.log("submit form event");
            console.log(e.target);
            this.model.save().done(function() {
                console.log("successfull update");
                self.returnHome();
            }).fail(function() {
                console.log("failed update");
            });

            // new app.Evento(result).save();
        },
        returnHome: function() {
            app.Router.navigate("", {
                trigger: true,
                replace: true
            });
        }
    });
})(jQuery);