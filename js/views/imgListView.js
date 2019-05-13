var app = app || {};

(function($) {
    app.imgListView = Backbone.View.extend({
        tagName: 'div',
        className: 'lista-imagenes col-100',

        initialize: function() {
            this.listenTo(this.model, 'add', this.addOne);
            // this.listenTo(this.model, 'all', this.render);
            this.listenTo(this.model, 'change:cover', this.showModel);
        },

        render: function() {
            console.log('into render imgListView');
            this.$el.empty();
            /*_.each(this.model.models, function(imagen) {
                this.renderOne(imagen);
            }, this);*/
            return this;
        },
        addOne: function(imagen) {
            console.log('se agrego un elemento a la lista');
            var imgView = new app.imgView({
                model: imagen
            });
            this.$el.append(imgView.render().$el);
            return this;
        },
        showModel: function(imagen) {
        	console.log('el atributo cover de un elemento, cambio');
            console.log(this.model.toJSON());
        }
    });
})(jQuery);