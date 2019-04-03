var app = app || {};

(function($) {
    app.EstadisticasView = Backbone.View.extend({
        tagName: 'div',
        className: 'stats-view',
        template: _.template($('#estadisticas-template').html()),
        dataTable: null,
        headers: ["id", "nombre", "fecha", "hora", "ciudad", "categoria", "asistentes", "estado"],

        initialize: function() {
            console.log("initialize stats function");
            var self = this;
            self.dataTable = [];
            var headersToUpper = self.headers.map(function(x){return x.toUpperCase()});
            self.dataTable.push(self.headers);
            $.each(this.model.toArray(), function(i, model) {
                // console.log(model.toJSON());
                var item = [];
                $.each(self.headers, function(i, key) {
                    var value = model.toJSON()[key];
                    if (value) {
                        item.push(value);
                    }
                });
                console.log(item);
                self.dataTable.push(item);
            });
            console.log(this.dataTable);
        },
        render: function() {
            var self = this;
            this.$el.html(this.template());
            google.charts.load('current', { 'packages': ['corechart', 'table', 'controls'], 'language': 'es' });
            google.setOnLoadCallback(function() {
                self.drawDashBoard();
            });
            return this;
        },
        drawDashBoard: function() {
            var data = google.visualization.arrayToDataTable(this.dataTable);
            // categoryfilter control
            var categoryfilter = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'filter',
                'options': {
                    'filterColumnLabel': 'estado', //atributo para seleccion del usuario
                    'ui': {
                        'allowMultiple': false,
                        'allowNone': true
                    }
                }
            });
            var table = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'table',
                'options': {
                    'width': '100%',
                    'height': '100%',
                    'legend': 'right'
                }
            });
            var dashboard = new google.visualization.Dashboard($('#dashboard'));
            dashboard.bind(categoryfilter, table);
            dashboard.draw(data);
            return this;
        }
    });
})(jQuery);