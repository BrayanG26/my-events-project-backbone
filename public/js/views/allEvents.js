/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function($) {
    'use strict';

    // Vista para mostrar eventos próximos
    // --------------

    app.AllEventsView = Backbone.View.extend({

        tagName: 'div',
        className: 'contenedor-formulario all-events',
        template: _.template($("#all-events-template").html()),

        events: {
            'click .button-calendar': 'fireDatePicker',
            'click .button-clear': 'clearDatePicker',
            'change .paid-state': 'handleStatePaid',
            'change .event-state': 'handleEventState',
            'change .event-category': 'handleEventCategory'
        },

        initialize: function() {

        },

        render: function() {
            var paid = this.paid || false,
                state = this.state || 'creado',
                category = this.category || 'educacion',
                that = this;
            this.$el.html(this.template());

            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: state, sePaga: paid, categoria: category }),
                wait: true,
                success: function(data) {
                    console.log('eventos recibidos');
                    console.log(data);
                    console.log(app.eventos);
                    that.$el.append(new app.EventoListView({ model: app.eventos }).render().el);
                }
            });
            return this;
        },

        handleStatePaid: function(e) {
            console.log($(e.target).is(':checked'));
            this.paid = $(e.target).is(':checked');
            this.filterEvents();
        },
        handleEventState: function(e) {
            console.log($(e.target).val());
            this.state = $(e.target).val();
            this.filterEvents();
        },
        handleEventCategory: function(e) {
            console.log($(e.target).val());
            this.category = $(e.target).val();
            this.filterEvents();
        },

        filterEvents: function() {
            var paid = this.paid || false,
                state = this.state || 'creado',
                category = this.category || 'educacion';

            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: state, sePaga: paid, categoria: category }),
                wait: true,
                success: function(data) {
                    console.log('eventos recibidos');
                    console.log(data);
                }
            });
        }
    });
})(jQuery);