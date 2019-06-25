var app = app || {}

(function() {

})();
app.Eventos = Backbone.Collection.extend({
    model: app.Evento,
    url: 'http://localhost:3000/api/eventos',
    initialize: function() {
        this.on('all', function() {
            console.log("Events collection has changed...");
        });
    }
});

app.eventos = new app.Eventos();