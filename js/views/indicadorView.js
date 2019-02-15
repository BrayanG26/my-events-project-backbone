var app = app || {}

(function ($) {
    
})(jQuery);

app.IndicadorView = Backbone.View.extend({
    tagName: 'div',
    className: 'col-sm-6 col-xl-3',
    template: _.template($('#indicator-template').html()),

    events: {},

    initialize: function () { },

    render: function () {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    viewDetails: function (params) { }
});