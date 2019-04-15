var app = app || {};

(function($) {
    app.EventoListView = Backbone.View.extend({
        tagName: 'div',
        className: 'contenedor-eventos lista-eventos container-fluid',

        initialize: function() {
            // this.collection = new app.Eventos(initialEvents); // see later
            // this.render();
            console.dir(this.model);
        },

        // render library by rendering each book in its collection
        render: function() {
            console.info("into render EventoListView");
            _.each(this.model.models,function(item) {
                this.renderOne(item);
            },this);
            return this;
        },

        // render a book by creating a BookView and appending the
        // element it renders to the library's element
        renderOne: function(item) {
            var eventoView = new app.EventoView({
                model: item
            });
            this.$el.append(eventoView.render().$el);
            return this;
        }
    });
})(jQuery)