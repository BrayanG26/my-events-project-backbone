var app = app || {};

(function($) {
    app.HomeView = Backbone.View.extend({
        tagName: 'div',
        className: 'home-container-view',
        template: _.template($('#home-template').html()),
        events: {},
        initialize: function() {
            // this.render();
        },
        render: function() {
            var listaEventos, listaIndicadores, estadisticas, tablas, listaEventosView;

            listaEventos = new app.Eventos(this.getSampleEventsData());
            listaEventosView = new app.EventoListView({ model: listaEventos });
            // listaEventos.fetch();
            console.info('listaEventos');
            console.log(listaEventos);
            this.$el.html(listaEventosView.render().el);
			return this;
        },
        getSampleEventsData: function() {
            var data = [{
                    "id": "1",
                    "emailOrganizador": "brayang26_@hotmail.com",
                    "nombreEvento": "Convocatoria para auxiliar contable CEIS",
                    "lugar": "",
                    "fecha": "30/09/2018",
                    "hora": "2:00 PM",
                    "ciudad": "Floridablanca",
                    "descripcion": "El dia indicado se hara una salida recreativa a las cascadas las golondrinas. Estar presente a las 8 am en la Estacion de servicio Lomas del Viento",
                    "estado": "creado"
                },
                {
                    "id": "2",
                    "emailOrganizador": "brayang26_@outlook.com",
                    "nombreEvento": "Feria de empleo UIS 2018-1",
                    "lugar": "",
                    "fecha": "13/09/2018",
                    "hora": "4:00 PM",
                    "ciudad": "Bucaramanga",
                    "descripcion": "No se pierda la feria de las flores de Medellin",
                    "estado": "creado"
                },
                {
                    "id": "3",
                    "emailOrganizador": "ivan4029@hotmail.com",
                    "nombreEvento": "Convocatoria Futbol Sala EISI",
                    "lugar": "",
                    "fecha": "19/09/2018",
                    "hora": "3:00 PM",
                    "ciudad": "Girón",
                    "descripcion": "Evento de teatro para la comunidad universitaria",
                    "estado": "creado"
                },
                {
                    "id": "4",
                    "emailOrganizador": "brayanguerrero4040@gmail.com",
                    "nombreEvento": "Convocatoria auxiliar contable CEIS",
                    "lugar": "",
                    "fecha": "15/09/2018",
                    "hora": "8:00 AM",
                    "ciudad": "Medellín",
                    "descripcion": "Este metodo es para averiguar si se retorna cuando en el front-end selecciono obtener metodos que estan planeados para mañana.",
                    "estado": "creado"
                }
            ];

            return data;
        }
    });
})(jQuery);