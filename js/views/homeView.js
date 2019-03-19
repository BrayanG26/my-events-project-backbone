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
            app.organizador = new app.Organizador({ id: app.usuario });
            app.organizador.fetch({
                success: function(data) {
                    console.log("datos del organizador recibidos");
                    console.info(data);
                    listaEventosView = new app.EventoListView({ model: app.eventos });
                    app.eventos.fetch({
                        data: $.param({ organizador: app.organizador.get('usuario') }),
                        success: function(data) {
                            console.log('eventos recibidos');
                            console.info(data)
                            that.$el.append(listaEventosView.render().$el);
                        }
                    });
                }
            });

            listaIndicadoresView = new app.IndicadorListView({ model: listaIndicadores });
            // listaEventos.fetch();
            // console.warn('listaEventos');
            // console.log(listaEventos);
            this.$el.append(listaIndicadoresView.render().$el);
            // this.$el.append(listaEventosView.render().$el);
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
        }
    });
})(jQuery);