// site/js/app.js

var app = app || {};

var indicadores = [
    { nombre: 'Ventas', valor: '400', unidad: 'US' },
    { nombre: 'Más compartido', valor: '23', unidad: 'compartidos' },
    { nombre: 'Más me gusta', valor: '10', unidad: 'me gusta' },
    { nombre: 'Hoy', valor: new Date(), unidad: '' }
];

// new app.AppView(indicadores);

$(function () {
    $(window).resize(function () {
        drawCharts();
    });
});