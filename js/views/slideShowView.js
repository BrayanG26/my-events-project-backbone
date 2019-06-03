var app = app || {};

(function($) {
    app.SlideshowView = Backbone.View.extend({
        tagName: 'div',
        className: 'slideshow-container',
        controls: _.template($("#slideshow-controls").html()),
        slideIndex: 1,
        currentSlide: null,

        events: {
            'click .prev': 'prevSlide',
            'click .next': 'nextSlide'
        },

        initialize: function() {
            // this.listenTo(this.model, 'change', this.render);
            console.log(this.model.toJSON());
            this.showSlide(this.slideIndex);
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            // this.$el.html('<p>la puerca esta en la pocilga</p>');
            // this.$el.prepend('<i>la puerca esta en la pocilga</i>');
            // this.$main = this.$('.slideshow-container');
            /*_.each(this.model.models, function(item) {
                this.renderOne(item);
            }, this);*/
            // Crear una vista slideElement
            this.$el.html(new app.SlideShowElement({ model: this.currentSlide }).render().el);
            this.$el.append(this.controls());
            return this;
        },
        renderOne: function(item) {
            var slideElement = new app.SlideShowElement({ model: item, el: this.$el });
            // console.log(slideElement.render().$el[0]);
            this.$el.append(slideElement.render().el);
            // this.$el.show();
            // console.log(this.$el[0]);
            return this;
        },
        showSlide: function(n) {
            if (n > this.model.models.length) { this.slideIndex = 1 }
            if (n < 1) { this.slideIndex = this.model.models.length }

            this.currentSlide = this.model.at(this.slideIndex - 1);
            this.render();
        },
        prevSlide: function() {
            var previous = -1;
            this.showSlide(this.slideIndex += previous);
        },
        nextSlide: function() {
            var next = 1;
            this.showSlide(this.slideIndex += next);
        },
        currentSlide: function() {

        }
    });
})(jQuery);