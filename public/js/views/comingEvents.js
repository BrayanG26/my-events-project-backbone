/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
    'use strict';

    // Vista para mostrar eventos próximos
    // --------------

    app.ComingEventsView = Backbone.View.extend({

        tagName: 'div',
        className: 'contenedor-formulario comming-events',
        template: _.template($("#coming-events-template").html()),

        events: {
            'click .button-calendar': 'fireDatePicker',
            'click .button-clear': 'clearDatePicker',
            'change .paid-state': 'handleStatePaid',
            'change .event-state':'handleEventState'
        },

        initialize: function () {

        },

        render: function () {
            var from = this.getFormattedDateFromToday(0),
                to = this.dateStr || this.getFormattedDateFromToday(7),
                paid = this.paid || false,
                state = this.state || 'creado',
                that = this,
                days = this.getDifferenceDateInDays(from, to);
            this.$el.html(this.template());
            this.$('#n-days').html((days > 1) ? days + ' días' : days + ' día');

            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: state, sePaga: paid, from: from, to: to }),
                wait: true,
                success: function (data) {
                    console.log('eventos recibidos');
                    console.log(data);
                    console.log(app.eventos);
                    that.$el.append(new app.EventoListView({ model: app.eventos }).render().el);
                }
            });
            return this;
        },

        getFormattedDateFromToday: function (days) {
            var today = new Date();
            if (days > 0) {
                today.setDate(today.getDate() + days);
            }
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            return mm + '/' + dd + '/' + yyyy;
        },

        getDifferenceDateInDays(from, to) {
            var f = new Date(from), t = new Date(to);
            var timeDiff = Math.abs(t.getTime() - f.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        },

        fireDatePicker: function (e) {
            console.log("fireDatePicker");
            var that = this;
            this.$datePicker = flatpickr('#fecha', {
                locale: "es",
                altInput: true,
                disableMobile: true,
                altFormat: "F j, Y",
                dateFormat: "m/d/Y",
                minDate: 'today',
                disable: [
                    function (date) {
                        var today = new Date();
                        return (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate());
                    }
                ],
                onChange: function (selectedDates, dateStr, instance) {
                    // console.log(dateText);
                    // console.log(inst);
                    // console.log($(this).datepicker("getDate"));
                    console.log(selectedDates);
                    console.log(instance);
                    that.dateStr = dateStr;
                    that.filterEvents();
                }
            });
            this.$datePicker.open();
        },

        clearDatePicker: function (e) {
            this.$datePicker.clear();
        },

        handleStatePaid: function (e) {
            console.log($(e.target).is(':checked'));
            this.paid = $(e.target).is(':checked');
            this.filterEvents();
        },
        handleEventState:function(e){
            console.log($(e.target).val());
            this.state = $(e.target).val();
            this.filterEvents();
        },

        filterEvents: function () {
            var from = this.getFormattedDateFromToday(0),
                to = this.dateStr || this.getFormattedDateFromToday(7),
                paid = this.paid || false,
                state = this.state || 'creado',
                days = this.getDifferenceDateInDays(from, to);

            this.$('#n-days').html((days > 1) ? days + ' días' : days + ' día');

            app.eventos.fetch({
                data: $.param({ organizador: app.organizador.get('usuario'), estado: state, sePaga: paid, from: from, to: to }),
                wait: true,
                success: function (data) {
                    console.log('eventos recibidos');
                    console.log(data);
                }
            });
        }
    });
})(jQuery);