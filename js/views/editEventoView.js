/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
    'use strict';

    // Vista para editar evento
    // --------------


    app.EditEventoView = Backbone.View.extend({

        tagName: 'div',
        className: 'contenedor-formulario',
        editTemplate: _.template($("#event-edit-template").html()),

        events: {
            'click .enable-edit': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
            'change .fields__input': 'modify',
            'submit #edit-event': 'save',
            'click .cancelar': 'returnHome',
            'click .edit-images': 'selectImages',
            'change #images': 'handleFileSelect',
            'click .upload-img': 'uploadImages'
        },

        initialize: function () {
            var self = this;
            console.log(this.model.toJSON());
            this.listenTo(this.model, 'change', this.render);
            Backbone.Validation.bind(this, {
                valid: function (view, attr, selector) {
                    console.warn("--- valid callback ---");
                    var $input = view.$('[name=' + attr + ']');
                    $input.removeClass('uk-form-danger');
                    // console.log(view);
                    // console.log(attr);
                    // console.log(selector);
                    // console.log($input);
                },
                invalid: function (view, attr, error, selector) {
                    console.warn("--- invalid callback ---");
                    var $input = view.$('[name=' + attr + ']');
                    $input.addClass('uk-form-danger');
                    // console.log(view);
                    // console.log(attr);
                    // console.log(selector);
                    // console.log(error);
                }
            });
            if (this.model.get('estado') != 'creado') {
                google.charts.load('current', {
                    'packages': ['corechart', 'table', 'controls', 'line'],
                    'language': 'es'
                });
                google.setOnLoadCallback(function () {
                    self.renderGraph(self.model.get('calificacion'));
                    $(window).on('resize', function () {
                        self.renderGraph(self.model.get('calificacion'));
                    });
                });
            }
            // this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
			var self = this;
            this.$el.html(this.editTemplate(this.model.attributes));
            var slideshow = new app.SlideshowView({
                model: new app.ImagenesServidor(this.model.get('imagenes')),
                el: this.$('.slideshow-container'),
                id: this.model.get('id'),
                estado: this.model.get('estado')
            });
            this.$slideContainer = this.$('.row > .col-100', this.$el)[0]; // Es el primer div.col-100 que es hijo directo de div.row
            this.$slideContainer.append(slideshow.render().el); // Inicializar vista Slideshow Manager
            this.$uploadButton = this.$('.upload-container');
            this.$uploadButton.hide();
            this.$spinner = this.$('.event-edit__spinner');

            // console.log(this.$('.event-edit__images'));
            if (this.model.get('estado') == 'eliminado') {
                $.each($(this.$el).find(":input"), function () {
                    if (!($(this).is('input:file') || $(this).is('input:submit') || $(this).is('input:button'))) {
                        // console.log(this);
                        // result[this.name] = (this.id != 'sePaga') ? this.value : $(this).is(':checked');
                        $(this).attr('disabled', '');
                    }
                });
                this.$('.edit-images').css('display', 'none');
            }
            this.$editInput = this.$('.edit');
            $('#fecha', this.el).datepicker({
                theme: 'teal',
                minDate: new Date(),
                monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                dateFormat: "mm/dd/yy",
                showButtonPanel: true,
                currentText: "HOY",
                closeText: "x",
                duration: "normal",
                showAnim: "fold",
                onSelect: function (dateText, inst) {
                    console.log(dateText);
                    console.log($(this).datepicker("getDate"));
					self.$('.datepicker').trigger('change');
					// console.log(self.$('.datepicker'));
                }
            });
            $('#hora', this.el).mdtimepicker({
                format: "hh:mm",
                theme: "blue",
                readOnly: true
            });
            return this;
        },
        bindValidations: function () {
            $.validate({
                modules: 'security, toggleDisabled',
                lang: 'en',
                errorMessagePosition: 'top',
            });
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function (e) {
            console.log("click on edit event");
            console.log(e.target);
            $(e.target).parents().eq(1).addClass('editing');
            this.$editInput.focus();
            // this.$(e.target).attr("readonly", false);
            // console.log("dblclick detected");
        },

        // Modify the corresponding model attribute when user changes that value
        modify: function (e) {
            var element = $(e.currentTarget),
                propiedad = element.attr("name"),
                // valor = element.val();
				valor = (element.is(':checkbox')) ? element.is(':checked') : element.val();
            console.warn(`${propiedad} : ${valor}`);
            this.model.set(propiedad, valor);
            if (this.model.isValid(propiedad)){
				console.log('valid, ok!');
			}
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function (e) {
            console.log("blur event");
            var element = $(e.currentTarget),
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
            console.log(element);
            console.log(previous);
            console.log(typeof previous);
            console.log(typeof current);
            console.log(current);
            current = typeof (previous) == 'string' ? current.trim() : JSON.parse(current);
            console.log(`${propiedad} : ${current}`);
            this.model.set(propiedad, current);
            console.log(this.model.toJSON());
            console.log(element.parents().eq(0));
            element.parents().eq(0).removeClass('editing');
        },

        // Create graphics
        renderGraph: function (calificacion) {
            console.log(calificacion);
            _.each(calificacion, function (value, key) {
                console.log(key);
                console.log(value);
                this.getAttrChart(key, value);
            }, this);
        },

        // Get corresponding attribute chart
        getAttrChart: function (attribute, values) {
            var headers = ['calificacion', 'valor'];
            var headersFormated = [{
                label: "Calificacion",
                type: "string"
            }, {
                label: "Valor",
                type: "number"
            }, {
                type: 'string',
                role: 'tooltip',
                p: {
                    html: true
                }
            }
            ],
                dataTable = [],
                data,
                chart,
                colors = ['blue', 'red', 'green', 'purple'];
            dataTable.push(headersFormated);
            var customHTMLTooltip = function (value) {
                var x;
                switch (value) {
                    case 1:
                        x = 'Malo';
                        break;
                    case 2:
                        x = 'Regular';
                        break;
                    case 3:
                        x = 'Normal';
                        break;
                    case 4:
                        x = 'Sobresaliente';
                        break;
                    case 5:
                        x = 'Excelente';
                        break;
                    default:
                        // statements_def
                        break;
                }

                return '<div class="uk-card-badge uk-label uk-padding-small"><span class="uk-text-large uk-text-large" >votos: ' + value + '</span></div>';
            }
            _.each(values, function (value, key) {
                dataTable.push([key, value, customHTMLTooltip(value)]);
            }, this);

            data = google.visualization.arrayToDataTable(dataTable);
            // var color = '#' + Math.floor(Math.random() * 16777215).toString(16).substring(0, 3);
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).substring(0, 3);

            var options = {
                title: attribute.toUpperCase(),
                width: '100%',
                height: 'auto',
                colors: [color],
                legend: 'bottom',
                tooltip: {
                    isHtml: true
                }
            };
            chart = new google.visualization.BarChart($('#' + attribute, this.$el)[0]);
            setTimeout(function () {
                chart.draw(data, options);
            }, 1500);
            // chart.draw(data);
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
            console.log("submit form event");
            if (this.model.isValid(true)) {
                console.log('El modelo es valido');
                console.log(this.model.toJSON());
                this.model.save().then(function (response) {
                    console.log('success');
                    console.log(response);
                    if (response.success) {
                        self.model.fetch();
                    }
                }, function (response) {
                    console.log('error');
                    console.log(response);
                }, function () {
                    console.log('processing...');
                })
            } else {
                console.log("El modelo es no valido");
                console.log(this.model.toJSON());
            }

            // new app.Evento(result).save();
        },
        returnHome: function () {
            app.Router.navigate("", {
                trigger: true,
                replace: true
            });
        },

        // for testing purposes
        selectImages: function (e) {
            this.$('#images', this.$el).trigger('click');
        },
        handleFileSelect: function (e) {
            var files = e.target.files,
                nImages = files.length;
            var self = this,
                thumbnails = self.$('.event-edit__images');
            self.imgList = new app.Imagenes();
            console.log(thumbnails);
            if (thumbnails.children()) {
                // thumbnails.empty();
                thumbnails.append(new app.thumbsImageContainer({
                    model: self.imgList
                }).render().$el);
                console.log('status of files: ' + files.length + ' in cache...');

            } else {
                console.log('no tiene hijos');
            }

            for (var i = 0, f; f = files[i]; i++) {
                var img = new app.Imagen();
                // Only process image files.
                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        self.imgList.add(new app.Imagen({
                            url: e.target.result,
                            alt: theFile.name,
                            cover: false,
                            file: theFile
                        }));
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
            if (nImages > 0) {
                this.$uploadButton.show();
            } else {
                this.$uploadButton.hide();
            }
        },

        // Upload images to server
        uploadImages: function (e) {
            e.preventDefault();
            var self = this;
            console.log('uploading images to the server...');
            this.imgList.setEventID(this.id);
            var buttonInput = this.$uploadButton.find('.upload-img');
            buttonInput.attr('disabled', '');
            this.$spinner.toggleClass('hidden');
            this.$('.list-thumbs-images').toggleClass('hidden');
            this.imgList.upload().then(function (response) {
                console.log('success');

                console.log(response);
                if (response.success) {
                    self.$spinner.fadeOut(1600, "linear");
                    self.$uploadButton.fadeOut(1600, "linear");
                    self.model.fetch();

                }
            }, function (response) {
                console.log('error');
                console.log(response);
            }, function () {
                console.log('processing...');
            });
        },

        bindValidations: function () { //revisar las validaciones, para aplicarlas de otra manera
            $.validate({
                modules: 'security, toggleDisabled, file, date',
                lang: 'en',
                validateOnBlur: false,
                errorMessagePosition: 'top',
                onError: function ($form) {
                    alert('Validation of form ' + $form.attr('id') + ' failed!');
                }
            });
        }
    });
})(jQuery);
