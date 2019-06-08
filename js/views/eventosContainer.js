var app = app || {};

(function($) {
    app.EventoContainer = Backbone.View.extend({
        tagName: 'div',
        className: 'contenedor-eventos container-fluid',
        controlTemplate: _.template($('#control-estado').html()),

        events: {
            'change #estado': 'filter',
            '': '',
            '': ''
        },

        initialize: function() {
            console.log("new EventoContainer view");
        },

        // render EventList by rendering each event in its collection
        render: function() {
            var that = this;

            /*console.info("into render eventosContainer");
            _.each(this.model.models, function(item) {
                this.renderOne(item);
            }, this);*/
            console.log("into EventoContainer's render method");
            this.$el.html(this.controlTemplate());
            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: 'creado' }),
                success: function(data) {
                    console.log('eventos recibidos');
                    console.log(data.toJSON());
                    that.$el.append(new app.EventoListView({ model: app.eventos }).render().el);
                }
            });
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
        },
        filter: function(e) {
            var that = this;
            console.log($(e.currentTarget).val());
            var estado = $(e.currentTarget).val();
            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: estado }),
                success: function(data) {
                    console.log('eventos recibidos');
                    if (!Array.isArray(data.toArray())) { console.log("array vacio"); }
                    console.log(data.toJSON());
                }
            });
        }
    });
})(jQuery)