var app = app || {};
(function() {
    // js/routers/router.js
    // ----------
    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home',
            'all': 'allEvents',
            'coming': 'comingEvents',
            'create': 'newEvent',
            'eventos/:id': 'editEvent',
            'me': 'myAccount',
            'close': 'closeSesion',
            'security': 'myPassword'
        },
        initialize: function() {
            this.$main = $('.main');
            var id = localStorage.getItem("idUser");
            console.warn("este es el id del organizador: " + id);
            app.organizador = new app.Organizador({ id: id });
        },
        newEvent: function() {
            if (!app.organizador) {
                app.organizador = new app.Organizador({ id: id });
            }
            app.organizador.fetch({
                success: function(response, data) {
                    console.log("datos del organizador recibidos");
                    console.log(data);
                    console.log(response);
                }
            });
            var eventFormView = new app.NuevoEventoView();
            this.$main.html(eventFormView.render().$el);
            eventFormView.bindValidations();
            console.log('into new-event route');
        },
        home: function() {
            console.log('into home route');
            this.$main.html(new app.HomeView().render().el);
        },
        allEvents: function() {
            console.log("into all Events rouote");
            this.$main.html('<p>Estamos desarrollando este sitio...</p>')
        },
        comingEvents: function() {
            console.log("into coming Events rouote");
            var id = localStorage.getItem("idUser");
            var self = this;
            if (!app.organizador) {
                app.organizador = new app.Organizador({ id: id });
            }
            app.organizador.fetch({
                success: function(response, data) {
                    console.log("datos del organizador recibidos");
                    console.log(data);
                    console.log(response);
                    self.$main.html(new app.ComingEventsView().render().el);
                }
            });
        },
        editEvent: function(id) {
            console.log("Into view-event route [id: " + id + "]");
            var evento = new app.Evento({ id: id });
            var self = this;
            var editEventView;
            evento.fetch({
                success: function(data) {
                    // console.log(data);
                    editEventView = new app.EditEventoView({ model: data });
                    self.$main.html(editEventView.render().$el);
                    editEventView.bindValidations();
                }
            });

        },
        myAccount: function() {
            console.log('into myAccount route');
            var id = localStorage.getItem("idUser");
            var self = this;
            var profileView = new app.ProfileView({ model: app.organizador });
            if (!app.organizador) {
                app.organizador = new app.Organizador({ id: id });
            }
            app.organizador.fetch({
                success: function(response, data) {
                    console.log("datos del organizador recibidos");
                    console.log(data);
                    console.log(response);
                    self.$main.html(profileView.render().el);
                    profileView.bindValidations();
                    // console.log(new app.ProfileView({ model: app.organizador }).render().el);
                }
            });
        },
        myPassword: function() {
            console.log('Into passwords management route');
            var id = localStorage.getItem("idUser");
            var self = this;
            var passwordsView = new app.PasswordsView({ model: app.organizador });
            if (!app.organizador) {
                app.organizador = new app.Organizador({ id: id });
            }
            app.organizador.fetch({
                success: function(response, data) {
                    console.log("datos del organizador recibidos");
                    console.log(data);
                    console.log(response);
                    self.$main.html(passwordsView.render().el);
                    passwordsView.bindValidations();
                }
            });
        },
        closeSesion: function() {
            localStorage.clear();
            window.location.href = './index.html';
        }
    });
    app.Router = new Workspace();
    Backbone.history.start();
})();