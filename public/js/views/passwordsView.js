var app = app || {};

(function () {
    app.PasswordsView = Backbone.View.extend({
        tagName: 'div',
        className: 'contenedor-formulario',
        template: _.template($('#user-password-template').html()),
        events: {
            'click .enable-edit': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
            'submit #edit-user': 'save',
            'click .cancelar': 'returnHome'
        },
        initialize: function () {
            console.log('initialize password view');
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            this.$editInput = this.$('.edit');
            return this;
        },
        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function (e) {
            console.log("click on edit event");
            console.log(e.target);
            var textLength = this.$editInput.val().length;
            $(e.target).parents().eq(1).addClass('editing');
            // console.log(this.$editInput);
            this.$editInput.focus();
            this.$editInput[0].setSelectionRange(textLength, textLength);
            // this.$(e.target).attr("readonly", false);
            // console.log("dblclick detected");
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function (e) {
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
        updateOnEnter: function (e) {
            var ENTER_KEY = 13;
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // If you're pressing `escape` we revert your change by simply leaving
        // the `editing` state.
        revertOnEscape: function (e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                // Also reset the hidden input back to the original value.
                this.$input.val(this.model.get('title'));
            }
        },
        save: function (e) {
            e.preventDefault();
            var self = this;
            var currentPassword = this.$('#cpassword').val();
            var newPassword = this.$('#apassword').val();
            this.model.set({ password: currentPassword });
            this.model.set({ nPassword: newPassword });
            console.log("submit form event");
            this.model.save().done(function () {
                console.log("successfull update");
                self.returnHome();
            }).fail(function () {
                console.log("failed update");
            });
        },
        disablePassField: function (e) {
            var $pass_field = $(e.target);
            if ($pass_field.val().length == 0) {
                $pass_field.attr('data-validation-length', ''); //Modificar directamente el DOM desde la vista no es una buena practica cuando se usa MVC
            }
        },
        bindValidations: function () { //revisar las validaciones, para aplicarlas de otra manera
            $.validate({
                modules: 'security, toggleDisabled, file',
                lang: 'en',
                errorMessagePosition: 'top',
            });
        },
        returnHome: function () {
            app.Router.navigate("", {
                trigger: true,
                replace: true
            });
        }
    });
})();