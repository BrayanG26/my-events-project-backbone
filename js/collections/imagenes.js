var app = app || {};

(function($) {

})(jQuery);
app.Imagenes = Backbone.Collection.extend({
    model: app.Imagen,
    url: function() {
        return app.urlAPI + 'eventos/' + this.id + '/images';
    },
    initialize: function() {
        // this.listenTo(this, 'change:cover', this.changeCover);
        // this.ccover = null, this.pcover;
    },
    setEventID: function(id) {
        this.id = id;
    },
    wrapData: function() {
        console.log("into upload method");
        var fd = new FormData(),
            image;
        _.each(this.models, function(model, i) {
            // model.set({ url: "" });
            image = model.get('file');
            fd.append("images", image, image.name);
        });
        return fd;
    },
    sync: function(method, model, options) {
        var opts = {
            url: this.url(),
            success: function(data) {
                if (options.success) {
                    options.success(data);
                }
            }
        };
        switch (method) {
            case "create":
                opts.type = "POST";
                opts.data = this.wrapData();
                // opts.data.append("file", model.get('file'));
                // opts.data.append("caption", model.get('caption'));
                opts.processData = false;
                opts.contentType = false;
                break;
            default:
                opts.type = "GET";
        }
        return $.ajax(opts);
    },
    upload: function() {
        this.sync('create', this);
    }
});