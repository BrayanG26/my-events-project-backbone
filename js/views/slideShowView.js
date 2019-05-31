var app = app || {};

(function($) {
    app.SlideshowView = Backbone.View.extend({
        tagName: 'div',
        className: 'slideshow-container',
        controls: _.template($("#slideshow-controls").html()),
        slideIndex: 1,
        pSlideItem: null,
        nSlideItem:null,

        events: {
            'click .prev': 'prevSlide',
            'click .next': 'nextSlide'
        },

        initialize: function() {
            // this.listenTo(this.model, 'change', this.render);
            console.log(this.model.toJSON());
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            // this.$el.html('<p>la puerca esta en la pocilga</p>');
            // this.$el.prepend('<i>la puerca esta en la pocilga</i>');
            // this.$main = this.$('.slideshow-container');
            this.$el.html(this.controls());
            _.each(this.model.models, function(item) {
                this.renderOne(item);
            }, this);
            this.showSlide(this.slideIndex);
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

            this.pSlideItem = this.nSlideItem;
            this.nSlideItem = this.model.at(this.slideIndex-1);
            this.nSlideItem.set({ current: true });
            if(this.pSlideItem){
                this.nSlideItem.set({ current: false });
            }
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