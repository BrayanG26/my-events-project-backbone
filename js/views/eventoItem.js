var app = app || {}

(function($) {})(jQuery);

app.EventoView = Backbone.View.extend({
    tagName: 'div',
    className: 'evento',
    template: _.template($('#evento-template').html()),

    initialize: function() {
        console.info('initialize EventoView object');
        console.warn(this.model.toJSON());
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));

        return this;
    }
});