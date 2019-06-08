var app = app || {};

(function($) {
    app.HomeView = Backbone.View.extend({
        tagName: 'div',
        className: 'home-container-view',
        template: _.template($('#home-template').html()),
        events: {
            '': '',
            '': '',
            '': ''
        },
        initialize: function() {
            // this.render();
        },
        render: function() {
            var listaEventos, listaIndicadores, estadisticas, tablas, listaEventosView;
            var that = this;
            // listaEventos = new app.Eventos();
            listaIndicadores = new app.Indicadores(this.getSampleEventsData().indicadores);
            listaIndicadoresView = new app.IndicadorListView({ model: listaIndicadores });
            this.$el.append(listaIndicadoresView.render().$el);
            app.organizador.fetch({
                success: function(model, response, options) {
                    console.warn(response);
                    // that.renderDashboard(data);
                    that.$el.append(new app.EventoContainer().render().el);
                    // listaEventosView = new app.EventoListView({ model: app.eventos });
                    /*app.eventos.fetch({
                        data: $.param({ organizador: app.organizador.get('usuario') }),
                        success: function(data) {
                            console.log('eventos recibidos');
                            that.renderDashboard(data);
                            that.$el.append(new app.EventoContainer().render().el);
                            
                        }
                    });*/
                }
            });


            return this;
        },
        getSampleEventsData: function() {
            return {
                indicadores: [
                    { nombre: 'Ventas', valor: '400', unidad: 'US' },
                    { nombre: 'Más compartido', valor: '23', unidad: 'compartidos' },
                    { nombre: 'Más me gusta', valor: '10', unidad: 'me gusta' },
                    { nombre: 'Hoy', valor: $.format.date(new Date(), 'ddd MMMM yyyy'), unidad: '' }
                ]
            };
        },
        renderDashboard: function(eventos) {
            console.log("into render dashboard method");
            this.$el.append(new app.EstadisticasView({ model: eventos }).render().$el);
        }
    });
})(jQuery);