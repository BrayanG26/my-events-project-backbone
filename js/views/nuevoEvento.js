var app = app || {};

(function ($) { })(jQuery);

app.NuevoEventoView = Backbone.View.extend({
    tagName: 'div',
    className: 'contenedor-formulario',
    template: _.template($('#nuevo-evento-template').html()),
    imgTemplate: _.template($('#image-thumbnail').html()),
    imgList: null,

    events: {
        'change #images': 'handleFileSelect',
        'submit #new-event': 'createEvent',
        'click .cancelar': 'returnHome'
    },

    initialize: function () { },

    render: function () {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template());
        $('.datepicker', this.el).datepicker({
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
            }
        });
        $('.timepicker', this.el).mdtimepicker({
            format: "hh:mm",
            theme: "blue",
            readOnly: true
        });
        return this;
    },
    bindValidations: function () { //revisar las validaciones, para aplicarlas de otra manera
        $.validate({
            modules: 'security, toggleDisabled, file, date',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    },
    handleFileSelect: function (e) {
        console.warn('a change occurred on file select!');
        var files = e.target.files;
        var self = this,
            thumbnails = self.$('#images-result');
        self.imgList = new app.Imagenes();
        if (thumbnails.children()) {
            thumbnails.empty();
            thumbnails.html(new app.imgListView({ model: self.imgList }).render().$el);
            console.log('status of files: ' + files.length + ' in cache...');
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
                    self.imgList.add(new app.Imagen({ url: e.target.result, alt: theFile.name, cover: false, file: theFile }));
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    },
    createEvent: function (e) {
        e.preventDefault();
        var result = {},
            images = $('input:file', this.el)[0].files,
            nImages = images.length,
            imgData = new FormData(),
            self = this,
            idEvent;
        console.log(images);
        $.each($(e.target).find(":input"), function () {
            if (!($(this).is('input:file') || $(this).is('input:submit') || $(this).is('input:button'))) {
                // console.log(this.id);
                result[this.name] = (this.id != 'sePaga') ? this.value : $(this).is(':checked');
            }
        });
        result["estado"] = "creado";
        // result["imagenes"] = data;
        result["organizador"] = app.organizador.get("usuario");
        console.log(result);
        // console.log(app.eventos.create(result));
        app.eventos.create(result, {
            success: function (collection, response) {
                console.log('into success callback');
                console.log(collection);
                console.log(response);
                var id = response.id;
                console.log(app.eventos.toJSON());
                if (nImages > 0) {
                    console.log("There are some images to upload");
                    self.imgList.setEventID(id);
                    self.imgList.upload().then(function (response) {
                        console.log('success');
                        console.log(response);
						setTimeout(self.returnHome(), 1500);
                    }, function (response) {
                        console.log('error');
                        console.log(response);
                    }, function () {
                        console.log('processing...');
                    });
                }else{
					self.returnHome();
				}
            }
        });
        /*app.eventos.create(result).done(function(data) {
            console.log(data);
            console.log("hay imagenes para cargar...");
            self.imgList.sync('create', self.imgList);
            // Append the files to the formData.
            for (var i = 0; i < nImages; i++) {
                var file = images[i];
                // imgData.append('images', file, file.name);
                imgData.append('images', file);
            }
            var request = this.uploadImages(imgData);
            request.done(function(data) {
                console.log(data);
                // self.returnHome(); // volver a pagina principal cuando confirme que guardó el evento
            }).fail(function(error) {
                console.error('An error ocurr');
                console.log(error);
            });
        });*/



    },
    returnHome: function () {
        app.Router.navigate("", {
            trigger: true,
            replace: true
        });
    },
    uploadImages: function (images) {

        /* imprimir formData */
        for (var pair of images.entries()) {
            console.log("*** *** *** *** *** ***");
            console.log(typeof pair[0] + ' - ' + typeof pair[1]);
            console.log(pair[0]);
            console.log(pair[1]);
        }
        console.log("*** *** *** *** *** ***");
        return $.ajax({
            type: "POST",
            url: app.urlAPI + 'upload',
            data: images,
            processData: false,
            contentType: false,
            dataType: 'json'
        });
    }
});