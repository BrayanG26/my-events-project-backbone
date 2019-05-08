var app = app || {};

(function($) {
    app.imgListView = Backbone.View.extend({
        tagName: 'div',
        className: 'lista-imagenes col-100',

        initialize: function() {
        	// this.listenTo(this.model, 'add', this.addOne);
        	this.listenTo(this.model, 'all', this.render);
        },

        render: function() {
            console.log('into render imgListView');
            console.log(this.model.toJSON());
            this.$el.html('');
            _.each(this.model.models, function(item) {
                this.renderOne(item);
            }, this);
            return this;
        },

        renderOne: function(item) {
            console.log('into renderOne imgListView');
            var imgView = new app.imgView({
                model: item
            });
            this.$el.append(imgView.render().$el);
            return this;
        }
    });
})(jQuery);