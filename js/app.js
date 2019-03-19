var app = app || {};

app.urlAPI = 'http://localhost:3000/api/';
app.init = function() {
    // Crear modelo tipo organizador
    // con la informacion del usuario
    // app.organizador = new app.Organizador(usuario);
    var idUser = localStorage.getItem("idUser");
    console.warn(`idUser ${idUser}`);
    this.usuario = idUser;
}

$(function() {
    $(window).resize(function() {
        drawCharts();
    });
});