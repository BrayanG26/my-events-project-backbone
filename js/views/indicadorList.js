var app = app || {};

(function($){
	app.IndicadorListView = Backbone.View.extend({
		tagName:'div',
		className:'lista-indicadores row',
		initialize:function(){
			
		},
		render:function(){
			console.log(this.model.toJSON());
			_.each(this.model.models,function(item) {
                this.renderOne(item);
            },this);
            return this;
		},
		renderOne:function(item){
			var indicadorView = new app.IndicadorView({
                model: item
            });
            this.$el.append(indicadorView.render().$el);
            return this;
		}
	});
})(jQuery);