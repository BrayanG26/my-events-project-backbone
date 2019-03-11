var app = app || {};

(function($) {})(jQuery);

app.NuevoEventoView = Backbone.View.extend({
    tagName: 'div',
    className: 'contenedor-formulario',
    template: _.template($('#nuevo-evento-template').html()),
    imgTemplate: _.template($('#image-thumbnail').html()),

    events: {
        'change #images': 'handleFileSelect',
        'submit ':''
    },

    initialize: function() {
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    bindValidations: function() {
        $.validate({
            modules: 'security, toggleDisabled, file',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    },
    handleFileSelect: function(e) {
        console.warn('a change occurred on selected files!');
        var files = e.target.files;
        var self = this, thumbnails = self.$('#images-result');
        if(thumbnails.children()){
            thumbnails.empty();
            console.log('status of files: '+files.length+' in cache...');
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
    }
});