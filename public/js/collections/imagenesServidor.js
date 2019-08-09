var app = app || {};

(function($) {

})(jQuery);
app.ImagenesServidor = Backbone.Collection.extend({
    model: app.ImagenServidor,
    /*url: function() {
        return app.urlAPI + 'eventos/' + this.id + '/images';
    },*/
    initialize: function() {
        // this.listenTo(this, 'change:cover', this.changeCover);
        // this.ccover = null, this.pcover;
    },
    comparator: function(a) {
        return a.get('cover') != true;
    }
});