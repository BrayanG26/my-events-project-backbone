var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.main-app',
    waitTyping: null,
    indicadores: null,
    // JavaScript events: https://www.w3schools.com/jsref/dom_obj_event.asp
    events: {
        'keyup .input__search': 'search',
        // 'click a.overview': 'showOverView',
        'focus .input__search': 'showCancelButton',
        'blur .input__search': 'hideCancelButton',
        'click .cd-cancel-search': 'resetInputSearch',
        'mouseout .content-wrapper': 'reset'
    },
    initialize: function (initialIndicators) {
        this.indicadores = new Indicadores(initialIndicators);
        this.$inputSearch = this.$('.input__search');
        this.$cancelButton = this.$('.search__reset-input');
        this.$h1 = this.$('h1');
        this.$indicadores = this.$('.indicators');
        this.$nuevoEvento = this.$('.new-event');
        this.render();
    },
    render: function () {
        // this.$el.html('<p>metodo render en accion</p>');
        this.indicadores.each(function (indicador) {
            this.renderIndicador(indicador);
        }, this);
    },
    search: function () {
        var self = this;

        // this.clearTimeOut(0);
        // console.log('onKeyUp, time: ');
        clearTimeout(this.waitTyping);
        // console.log(this.waitTyping);
        this.waitTyping = setTimeout(function () {
            console.log(self.$inputSearch.val());
        }, 1000);
        console.log('this.waitTyping = ', this.waitTyping);
    },
    showCancelButton: function (param) {
        this.$('.cd-search').addClass('cd-hide-search');
        this.$cancelButton.addClass('visible');
    },
    hideCancelButton: function (param) {
        this.$('.cd-search').removeClass('cd-hide-search');
        this.$cancelButton.removeClass('visible');
    },
    resetInputSearch: function (param) {
        this.$inputSearch.val('');
    },
    showOverView: function () {
        this.$('.statistics, .events, .indicators, .tables').toggle();
    },
    renderIndicador: function (indicador) {
        var indicadorView = new app.IndicadorView({ model: indicador });
        this.$indicadores.append(indicadorView.render().el);
    },
    showNewEventForm: function (e) {
        e.preventDefault();
        var view = new app.NuevoEventoView({model:new app.Evento()});
        this.$nuevoEvento.append(view.render().el); 
    }
});

(function ($) {
    
})(jQuery);