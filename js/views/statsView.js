var app = app || {};

(function ($) {
    app.EstadisticasView = Backbone.View.extend({
        tagName: 'div',
        className: 'stats-view',
        template: _.template($('#estadisticas-template').html()),

        initialize: function () {
            console.log("initialize stats function");
        },
        render: function () {
            var self = this;
            this.$el.html(this.template());
            google.charts.load('current', { 'packages': ['corechart', 'table', 'controls', 'line'], 'language': 'es' });
            google.setOnLoadCallback(function () {
                self.drawDashBoard();
            });
            return this;
        },
        drawDashBoard: function () {
            var self = this;
            self.loadDashboardTable();
            self.loadColumnChart();
            $(window).on('resize', function () {
                self.loadDashboardTable();
                self.loadColumnChart();
            });

            return self;
        },
        loadDashboardTable: function () {
            var headers = ["nombre", "fecha", "hora", "ciudad", "categoria", "asistentes", "estado"]
            var headersFormated = [{ label: "nombre", type: "string" },
            { label: "fecha", type: "date" },
            { label: "hora", type: "string" },
            { label: "ciudad", type: "string" },
            { label: "categoria", type: "string" },
            { label: "asistentes", type: "number" },
            { label: "estado", type: "string" }
            ];
            dataTable = [];
            dataTable.push(headersFormated);
            $.each(this.model.toArray(), function (i, model) {
                var item = [];
                $.each(headers, function (i, key) {
                    var value = model.toJSON()[key];

                    if (value) {
                        if (key == 'fecha') {
                            value = new Date(value);
                        }
                        item.push(value);
                    }
                });
                dataTable.push(item);
            });
            var data = google.visualization.arrayToDataTable(dataTable);
            // categoryfilter control
            var cssClass = 'category-filter-select';
            var categoryfilter = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'filter',
                'options': {
                    'filterColumnLabel': 'estado', //atributo para seleccion del usuario
                    'useFormattedValue': true,
                    'ui': {
                        'allowMultiple': false,
                        'allowTyping': false,
                        'labelStacking': 'horizontal',
                        'label': 'Estado: ',
                        'cssClass': cssClass
                    }
                }
            });
            var cssClassNames = {
                'headerRow': 'header-row',
                'tableRow': 'table-font',
                'hoverTableRow': 'hover-table-row',
                'rowNumberCell': 'row-number-cell',
                'selectedTableRow': 'selected-row-table',
                'tableCell': 'table'
            }
            var table = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'table',
                'options': {
                    'width': '100%',
                    'height': '100%',
                    'legend': 'right',
                    'showRowNumber': true,
                    'alternatingRowStyle': false,
                    'cssClassNames': cssClassNames
                }
            });
            google.visualization.events.addListener(table, 'select', function () {
                console.log('a table row was selected');
                var row = table.getChart().getSelection()[0].row || null;
				console.log(table.getChart().getSelection()[0]);
                console.log(table.getDataTable().getValue(row, 0));
            });
            var dashboard = new google.visualization.Dashboard($('#dashboard-table'));
            dashboard.bind(categoryfilter, table);
            dashboard.draw(data);
        },
        loadColumnChart: function () {
            var headers = ["nombre", "asistentes", "meinteresa", "compartido", "megusta"];
            var headersFormated = [{ label: "nombre", type: "string" },
            { label: "asistentes", type: "number" },
            { label: "meinteresa", type: "number" },
            { label: "compartido", type: "number" },
            { label: "megusta", type: "number" }
            ];
            var dataTable = [];
            dataTable.push(headersFormated);
            $.each(this.model.toArray(), function (i, model) {
                var item = [];
                $.each(headers, function (i, key) {
                    var value = model.toJSON()[key];

                    if (value) {
                        if (key == 'fecha') {
                            console.log(value);
                            value = new Date(value);
                            console.log(value);
                        }
                        item.push(value);
                    }
                });
                dataTable.push(item);
            });
            var data = google.visualization.arrayToDataTable(dataTable);
            var options = {
                title: 'Atributos de los eventos',
                legend: { position: 'bottom' },
                animation: {
                    duration: 2000,
                    easing: 'in',
                },
                fontName: 'Roboto'
            }
            var chart = new google.visualization.ColumnChart($("#line")[0]);
            google.visualization.events.addListener(chart, 'select', function () {
                console.log('selected ocurr in ColumnChart');
                console.log(chart.getSelection());
            });
            console.log(dataTable);
            chart.draw(data, options);
        }
    });
})(jQuery);