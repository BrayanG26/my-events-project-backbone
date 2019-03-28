var app = app || {};
(function() {
    // js/routers/router.js
    // ----------
    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home',
            'create': 'newEvent',
            'eventos/:id': 'editEvent'
        },
        initialize: function() {
            this.$main = $('.main');
            app.init();
            app.organizador = new app.Organizador({ id: app.usuario });
            // this.$indicadores = self.$('.indicators');
            // this.$estadisticas = self.$('.statistics');
            // this.$eventos = self.$('.events');
            // this.$tablas = self.$('.tables');
            // this.$nuevoEvento = self.$('.new-event');
        },
        newEvent: function(param) {
            var eventFormView = new app.NuevoEventoView();
            this.$main.html(eventFormView.render().$el);
            eventFormView.bindValidations();
            // this.$nuevoEvento.show();
            // this.$indicadores.hide();
            // this.$estadisticas.hide();
            // this.$eventos.hide();
            // this.$tablas.hide();
            console.log('into new-event route');
        },
        home: function(param) {
            console.log('into home route');
            // this.$indicadores.show();
            // this.$estadisticas.show();
            // this.$eventos.show();
            // this.$tablas.show();
            // this.$nuevoEvento.hide();
            // var homeView = new app.HomeView();
            this.$main.html(new app.HomeView().render().el);
        },
        editEvent: function(id) {
            console.log("Into view-event route [id: " + id + "]");
            var evento = new app.Evento({ id: id });
            var self = this;
            var editEventView;
            evento.fetch({
                success: function(data) {
                    console.log(data);
                    editEventView = new app.EditEventoView({ model: data });
                    editEventView.bindValidations();
                    self.$main.html(editEventView.render().$el);
                }
            });
            
        }
    });
    app.Router = new Workspace();
    Backbone.history.start();
})();