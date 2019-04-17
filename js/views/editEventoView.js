/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function($) {
    'use strict';

    // Vista para editar evento
    // --------------


    app.EditEventoView = Backbone.View.extend({
        //... is a list tag.
        tagName: 'div',
        className: 'contenedor-formulario',

        editTemplate: _.template($("#event-edit-template").html()),

        events: {
            'click .enable-edit': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
            'submit #edit-event': 'save',
            'click .cancelar': 'returnHome'
        },

        initialize: function() {
            console.log(this.model.toJSON());
            this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'destroy', this.remove);
        },

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
            console.log("blur event");
            var element = $(e.target),
                propiedad = element.attr("name"),
                previous = this.model.get(propiedad),
                current;
            if (element.is(":checkbox")) {
                if (element.is(":checked")) {
                    current = 'true';
                } else {
                    current = 'false';
                }
            } else {
                current = element.val() || previous;
            }

            current = typeof(previous) == 'string' ? current.trim() : JSON.parse(current);
            console.log(`${propiedad} : ${current}`);
            this.model.set(propiedad, current);
            console.log(this.model.toJSON());
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

        save: function(e) {
            e.preventDefault();
            var self = this;
            console.log("submit form event");
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
        },
        bindValidations: function() { //revisar las validaciones, para aplicarlas de otra manera
            $.validate({
                modules: 'security, toggleDisabled, file, date',
                lang: 'en',
                validateOnBlur : false,
                errorMessagePosition: 'top',
                onError: function($form) {
                    alert('Validation of form ' + $form.attr('id') + ' failed!');
                }
            });
        }
    });
})(jQuery);