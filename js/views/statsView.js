var app = app || {};

(function($) {
    app.EstadisticasView = Backbone.View.extend({
        tagName: 'div',
        className: 'row stats-view uk-margin',
        template: _.template($('#stats-template').html()),

        initialize: function() {
            console.log("initialize stats function");
            console.log(this.model);
        },
        render: function() {
            var self = this;
            this.$el.html(this.template());
            google.charts.load('current', { 'packages': ['corechart', 'table', 'controls', 'line'], 'language': 'es' });
            google.setOnLoadCallback(function() {
                self.drawDashBoard();
            });
            return this;
        },
        drawDashBoard: function() {
            var self = this;
            self.loadDashboardTable();
            self.loadColumnChart();
            $(window).on('resize', function() {
                self.loadDashboardTable();
                self.loadColumnChart();
            });

            return self;
        },
        loadDashboardTable: function() {
            var headers = ["nombre", "fecha", "hora", "ciudad", "categoria", "asistentes", "estado"]
            var headersFormated = [
                { label: "nombre", type: "string" },
                { label: "fecha", type: "date" },
                { label: "hora", type: "string" },
                { label: "ciudad", type: "string" },
                { label: "categoria", type: "string" },
                { label: "asistentes", type: "number" },
                { label: "estado", type: "string" }
            ];
            dataTable = [];
            dataTable.push(headersFormated);
            $.each(this.model.toArray(), function(i, model) {
                var item = [];
                $.each(headers, function(i, key) {
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
            var stateFilter = new google.visualization.ControlWrapper({
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
                        'cssClass': 'category-filter-select'
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
            google.visualization.events.addListener(table, 'select', function() {
                console.log('a table row was selected');
                var row = table.getChart().getSelection()[0].row || null;
                console.log(table.getChart().getSelection()[0]);
                console.log(table.getDataTable().getValue(row, 0));
            });
            var dashboard = new google.visualization.Dashboard($('#dashboard-table'));
            dashboard.bind(stateFilter, table);
            dashboard.draw(data);
        },
        loadColumnChart: function() {
            var headers = ["categoria", "nombre", "asistentes", "meinteresa", "compartido", "megusta"];
            var headersFormated = [
                { label: "Categoria", type: "string" },
                { label: "Nombre", type: "string" },
                { label: "Asistentes", type: "number" },
                { label: "Me Interesa", type: "number" },
                { label: "Compartido", type: "number" },
                { label: "Me gusta", type: "number" }
            ];

            var dataTable = [];
            dataTable.push(headersFormated);
            $.each(this.model.toArray(), function(i, model) {
                var item = [];
                $.each(headers, function(i, key) {
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
            console.warn('linechart datatable');
            console.log(dataTable);
            var data = google.visualization.arrayToDataTable(dataTable);
            var options = {
                title: 'Atributos de los eventos',
                legend: { position: 'bottom' },
                animation: {
                    duration: 5000,
                    easing: 'out',
                },
                fontName: 'Roboto'
            }
            console.log(data);

            var categoryfilter = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'category_filter_column',
                'options': {
                    'filterColumnLabel': 'Categoria', //atributo para seleccion del usuario
                    'useFormattedValue': true,
                    'ui': {
                        'allowMultiple': false,
                        'allowTyping': false,
                        'labelStacking': 'horizontal',
                        'label': 'Categoria: ',
                        'cssClass': 'category-filter-select'
                    }
                }
            });
            var namefilter = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'name_filter_column',
                'options': {
                    'filterColumnLabel': 'Nombre', //atributo para seleccion del usuario
                    'useFormattedValue': true,
                    'ui': {
                        'allowMultiple': false,
                        'allowTyping': false,
                        'labelStacking': 'horizontal',
                        'label': 'Nombre: ',
                        'cssClass': 'category-filter-select'
                    }
                }
            });
            var chart = new google.visualization.ChartWrapper({
                'chartType': 'BarChart',
                'containerId': 'column',
                'options': {
                    'width': '100%',
                    'height': 'auto',
                    'legend': 'bottom',
                    'isStacked': true
                },
                'view': { 'columns': [1, 2, 3, 4, 5] }
            });
            /* google.visualization.events.addListener(chart, 'select', function () {
                console.log('selected ocurr in ColumnChart');
                console.log(chart.getSelection());
            }); */
            var dashboard = new google.visualization.Dashboard($('#dashboard-column'));
            // dashboard.bind(categoryfilter, chart);
            // dashboard.bind(categoryfilter).bind(namefilter).bind(chart);
            dashboard.bind(categoryfilter, namefilter);
            dashboard.bind(namefilter, chart);
            dashboard.draw(data);
        }
    });
})(jQuery);