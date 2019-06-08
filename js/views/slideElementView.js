var app = app || {};

(function($) {
    app.SlideShowElement = Backbone.View.extend({
        tagName: 'div',
        className: 'fade',
        template: _.template($('#slide-element').html()),

        events: {
            '': ''
        },

        initialize: function() {
            // this.listenTo(this.model, 'change', this.render);
            // console.log(this.model.toJSON());  
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes)); // posible error al actualizar en el DOM
            // this.$el.show();
            // console.log(this.$el[0]);
            return this;
        }
    });
})(jQuery);