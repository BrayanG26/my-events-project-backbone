var app = app || {};

(function($) {

})(jQuery);
app.Imagenes = Backbone.Collection.extend({
    model: app.Imagen,
    initialize: function() {
        this.listenTo(this, 'change:cover', this.changeCover);
        this.ccover = null, this.pcover;
    },
    changeCover: function(imagen) {
        if (imagen.get('cover')) {
            console.log("la imagen ha sido seleccionada como portada");
            this.pcover = this.ccover;
            this.ccover = imagen;
            if (this.pcover) {
                this.pcover.removeAsCover();
            }
        } else {
            console.log("la imagen no ha sido seleccionada como portada");
        }
        console.log(this.ccover.toJSON());
    }
});