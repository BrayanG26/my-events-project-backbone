var app = app || {};

(function($){
	app.IndicadorListView = Backbone.View.extend({
		tagName:'div',
		className:'lista-indicadores uk-grid-match uk-grid-medium uk-child-width-expand@s',
		
		initialize:function(){},
		render:function(){
			console.log(this.model.toJSON());
			this.$el.attr('uk-grid','');
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