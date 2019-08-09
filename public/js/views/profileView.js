var app = app || {};

(function() {
    app.ProfileView = Backbone.View.extend({
        tagName: 'div',
        className: 'contenedor-formulario',
        template: _.template($('#user-data-template').html()),
        events: {
            'click .enable-edit': 'edit',
            'keypress .edit': 'updateOnEnter',
            'change .fields__input': 'modify',
            'blur .edit': 'close',
            'submit #edit-profile': 'save'
        },
        initialize: function() {
            console.log('initialize profile view');
            this.listenTo(this.model, 'change', this.render);
            Backbone.Validation.bind(this, {
                valid: function(view, attr, selector) {
                    console.warn("--- valid callback ---");
                    var $input = view.$('[name=' + attr + ']');
                    $input.removeClass('uk-form-danger');
                    // console.log(view);
                    console.log(attr);
                    // console.log(selector);
                    // console.log($input);
                },
                invalid: function(view, attr, error, selector) {
                    console.warn("--- invalid callback ---");
                    var $input = view.$('[name=' + attr + ']');
                    $input.addClass('uk-form-danger');
                    // console.log(view);
                    console.log(attr);
                    // console.log(selector);
                    // console.log(error);
                }
            });
        },
        render: function() {
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            this.$editInput = this.$('.edit');
            return this;
        },
        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function(e) {
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

        modify: function(e) {
            var element = $(e.currentTarget),
                propiedad = element.attr("name"),
                // valor = element.val();
                valor = (element.is(':checkbox')) ? element.is(':checked') : element.val();
            console.warn(`${propiedad} : ${valor}`);
            this.model.set(propiedad, valor);
            if (this.model.isValid(propiedad)) {
                console.log('valid, ok!');
            } else {
                console.log('invalid!');
                UIkit.notification({
                    message: "<span uk-icon='icon: close'></span> " + propiedad + " no puede quedar vacío",
                    status: 'warning',
                    pos: 'top-center',
                    timeout: 3000
                });
            }
        },
        save: function(e) {
            e.preventDefault();
            var self = this;
            console.log("submit form event");
            // this.model.save().done(function() {
            //     console.log("successfull update");
            //     self.returnHome();
            // }).fail(function() {
            //     console.log("failed update");
            // });
            if (this.model.isValid(true)) {
                console.log('El modelo es valido');
                console.log(this.model.toJSON());
                this.model.save().then(function(response) {
                    console.log('success');
                    console.log(response);
                    UIkit.notification({
                        message: "<span uk-icon='icon: check'></span> Modificado!",
                        status: 'success',
                        pos: 'top-center',
                        timeout: 2600
                    });
                    if (response.success) {
                        self.model.fetch();
                    }
                }, function(response) {
                    console.log('error');
                    UIkit.notification({
                        message: "<span uk-icon='icon: info'></span> Algo ocurrió, no se pudo..",
                        status: 'danger',
                        pos: 'top-center',
                        timeout: 2600
                    });
                    console.log(response);
                }, function() {
                    console.log('processing...');
                });
            } else {
                console.log("El modelo es no valido");
                console.log(this.model.toJSON());
                UIkit.notification({
                    message: "<span uk-icon='icon: info'></span> Ha dejado campos vacíos...",
                    status: 'warning',
                    pos: 'top-center',
                    timeout: 3000
                });
            }
        },
        bindValidations: function() { //revisar las validaciones, para aplicarlas de otra manera
            $.validate({
                modules: 'security, toggleDisabled, file',
                lang: 'en',
                errorMessagePosition: 'top',
            });
        },
        returnHome: function() {
            app.Router.navigate("", {
                trigger: true,
                replace: true
            });
        }
    });
})();