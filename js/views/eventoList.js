var app = app || {};

(function($) {
    app.EventoListView = Backbone.View.extend({
        tagName: 'div',
        className: 'lista-eventos container-fluid',
        // controlTemplate: _.template($('#control-estado').html()),

        events: {
            '': '',
            '': '',
            '': ''
        },

        initialize: function() {
            // this.collection = new app.Eventos(initialEvents); // see later
            // this.render();
            this.listenTo(this.model, 'sync',this.render);
            console.dir(this.model.toJSON());
            // console.log(this.model.toArray());
        },

        // render EventList by rendering each event in its collection
        render: function() {
            console.info("into render EventoListView");
            // this.$el.html(this.controlTemplate());
            this.$el.html('');
            _.each(this.model.models, function(item) {
                this.renderOne(item);
            }, this);
            return this;
        },

        // render a event by creating a EventoView and appending the
        // element it renders to the EventList element
        renderOne: function(item) {
            var eventoView = new app.EventoView({
                model: item
            });
            this.$el.append(eventoView.render().$el);
            return this;
        }
    });
})(jQuery)