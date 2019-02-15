var app = app || {};

(function ($) {
})(jQuery);

app.NuevoEventoView = Backbone.View.extend({
    tagName:'div',
    className:'contenedor-formulario',
    template: _.template($('#nuevo-evento-template').html()),

    events: {},

    initialize: function () {
    },

    render: function () {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    bindValidations:function () {
        $.validate({
            modules: 'security, toggleDisabled',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    }
});