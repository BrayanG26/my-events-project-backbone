var app = app || {};

(function ($) { })(jQuery);
app.Imagenes = Backbone.Collection.extend({
    model: app.Imagen,
    cover: undefined,
    url: function () {
        var queryString = (!(this.cover === undefined)) ? '?portada=' + this.cover : '';
        return app.urlAPI + 'eventos/' + this.id + '/images' + queryString;
    },
    initialize: function () {
        this.on('all', function (method) {
            console.log("imagenes collection status: " + method);
        });
    },
    setEventID: function (id) {
        this.id = id;
    },
    wrapData: function () {
        console.log("into upload method");
        var fd = new FormData(),
            image;
        _.each(this.models, function (model, i) {
            console.log(model.toJSON());
            if (model.get('cover')) {
                console.log('ud seleccionó una imagen como portada para su evento');
                console.log('\t' + model.get('file').name);
                // fd.append("portada", model.get('file'));
                this.cover = model.get('file').name;
                // console.warn(this.url());
            }
            image = model.get('file');
            fd.append("images", image, image.name);
        }, this);
        return fd;
    },
    sync: function (method, model, options) {
        var opts = {
            // url: this.url(),
            type: "POST",
            success: function (response) {
                /* if (options.success || false) {
                    options.success(data);
                } */
                console.log(response);
                return response;
            },
            processData: false,
            contentType: false
        };
        switch (method) {
            case "create":
                opts.data = this.wrapData();
                // opts.data.append("file", model.get('file'));
                // opts.data.append("caption", model.get('caption'));
                opts.url = this.url();
                break;
            default:
                opts.type = "GET";
        }
        return $.ajax(opts);
    },
    upload: function () {
        /* var o = {
            success: function(response) {
				console.log(response);
                return response;
            }
        } */
        return this.sync('create', this);
    }
});