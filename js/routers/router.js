var app = app || {};
(function () {
    // js/routers/router.js
    // ----------
    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home',
            'create': 'newEvent',
            'eventos/:id': 'editEvent',
            'mi': 'myAccount',
            'close':'closeSesion'
        },
        initialize: function () {
            this.$main = $('.main');
            var id = localStorage.getItem("idUser");
            app.organizador = new app.Organizador({ id: id });
        },
        newEvent: function (param) {
            var eventFormView = new app.NuevoEventoView();
            this.$main.html(eventFormView.render().$el);
            eventFormView.bindValidations();
            console.log('into new-event route');
        },
        home: function (param) {
            console.log('into home route');
            this.$main.html(new app.HomeView().render().el);
        },
        editEvent: function (id) {
            console.log("Into view-event route [id: " + id + "]");
            var evento = new app.Evento({ id: id });
            var self = this;
            var editEventView;
            evento.fetch({
                success: function (data) {
                    // console.log(data);
                    editEventView = new app.EditEventoView({ model: data });
                    self.$main.html(editEventView.render().$el);
                    editEventView.bindValidations();
                }
            });

        },
        myAccount: function () {
            console.log('into myAccount route');
            var id = localStorage.getItem("idUser");
            var self = this;
            var profileView = new app.ProfileView({ model: app.organizador });
            if (!app.organizador) {
                app.organizador = new app.Organizador({ id: id });
            }
            app.organizador.fetch({
                success: function (data) {
                    console.log("datos del organizador recibidos");
                    self.$main.html(profileView.render().el);
                    profileView.bindValidations();
                    // console.log(new app.ProfileView({ model: app.organizador }).render().el);
                }
            });
        },
        closeSesion:function () {
            localStorage.clear();
            window.location.href = './index.html';
        }
    });
    app.Router = new Workspace();
    Backbone.history.start();
})();