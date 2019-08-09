var app = app || {};

(function($) {
    app.thumbsImageContainer = Backbone.View.extend({
        tagName: 'ul',
        className: 'uk-thumbnav list-thumbs-images',

        initialize: function() {
            this.listenTo(this.model, 'add', this.addOne);
            // this.listenTo(this.model, 'all', this.render);
            this.listenTo(this.model, 'change:cover', this.changeCover);
            this.ccover = null, this.pcover;
            console.warn(this.model);
        },

        render: function() {
            console.log('into render thumbsImageContainer');
            this.$el.empty();
            /*_.each(this.model.models, function(imagen) {
                this.renderOne(imagen);
            }, this);*/
            return this;
        },
        addOne: function(imagen) {
            console.log('se agrego un elemento a la lista');
            var imgView = new app.thumbsImageElement({
                model: imagen
            });
            this.$el.append(imgView.render().$el);
            return this;
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
        }
    });
})(jQuery);