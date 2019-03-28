var app = app || {};

(function($) {})(jQuery);

app.NuevoEventoView = Backbone.View.extend({
    tagName: 'div',
    className: 'contenedor-formulario',
    template: _.template($('#nuevo-evento-template').html()),
    imgTemplate: _.template($('#image-thumbnail').html()),

    events: {
        'change #images': 'handleFileSelect',
        'submit #new-event': 'createEvent',
        'click .cancelar': 'returnHome'
    },

    initialize: function() {},

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template());
        $('.datepicker', this.el).datepicker({
            minDate: new Date(),
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            dateFormat: "MM dd, yy",
            showButtonPanel: true,
            currentText: "HOY",
            closeText: "x",
            duration: "normal",
            showAnim: "fold",
            onSelect: function(dateText, inst) {
                console.log(dateText);
                console.log($(this).datepicker("getDate"));
            }
        });
        $('.timepicker', this.el).mdtimepicker({
            format: "hh:mm",
            theme: "blue",
            readOnly: true,
            timechanged: function(e) {
                console.log(e.value); // gets the input value
                console.log(e.time); // gets the data-time value
            }
        });
        return this;
    },
    bindValidations: function() { //revisar las validaciones, para aplicarlas de otra manera
        $.validate({
            modules: 'security, toggleDisabled, file, date',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    },
    handleFileSelect: function(e) {
        console.warn('a change occurred on file select!');
        var files = e.target.files;
        var self = this,
            thumbnails = self.$('#images-result');
        if (thumbnails.children()) {
            thumbnails.empty();
            console.log('status of files: ' + files.length + ' in cache...');
        }
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    thumbnails.append(self.imgTemplate({
                        url: e.target.result,
                        alt: theFile.name
                    }));
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    },
    createEvent: function(e) {
        e.preventDefault();
        console.log(e.target);
        var result = {};

        $.each($(e.target).serializeArray(), function() {
            console.log(this);
            result[this.name] = this.value;
        });
        result["estado"] = "creado";
        // console.warn(app.organizador.get("usuario"));
        result["organizador"] = app.organizador.get("usuario");
        console.log(result);
        app.eventos.create(result);
        // new app.Evento(result).save();
    },
    returnHome: function() {
        app.Router.navigate("", {
            trigger: true,
            replace: true
        });
    }
});