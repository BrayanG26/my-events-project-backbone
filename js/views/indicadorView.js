var app = app || {}

(function ($) {
    
})(jQuery);

var app = app || {};

(function($){
    
})(jQuery);

app.IndicadorView = Backbone.View.extend({
    tagName: 'div',
    className: 'indicador col-sm-6 col-xl-3',
    template: _.template($('#indicador-template').html()),

    events: {},

    initialize: function () { },

    render: function () {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});