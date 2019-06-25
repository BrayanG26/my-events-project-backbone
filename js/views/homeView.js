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
            this.renderDashboard();
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
                    { nombre: 'publicados', valor: '15', unidad: 'eventos', icon: 'hashtag' },
                    { nombre: '+ compartido', valor: '23', unidad: 'compartidos', icon: 'social' },
                    { nombre: '+ me gusta', valor: '10', unidad: 'me gusta', icon: 'happy' },
                    { nombre: 'Hoy', valor: $.format.date(new Date(), 'dd/MM/yyyy'), unidad: '', icon: 'calendar' }
                ]
            };
        },
        renderDashboard: function() {
            var dashListEvents = new app.Eventos(),that = this;
            console.log(dashListEvents);
            console.log("into render dashboard method");
            
            dashListEvents.fetch({
                success: function(model, response, options) {
                    console.warn(response);
                    that.$el.append(new app.EstadisticasView({ model: dashListEvents }).render().$el);
                }
            });
        }
    });
})(jQuery);