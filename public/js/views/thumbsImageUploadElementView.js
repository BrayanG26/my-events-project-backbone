var app = app || {};

(function($) {
    app.thumbsImageElement = Backbone.View.extend({
        tagName: 'li',
        className: 'image__element',
        template: _.template($('#thumbs-image-element').html()),

        events: {
            'click .image-checkbox': 'checkImage'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

        checkImage: function(e) {
            this.model.setAsCover();
            console.log("you've clicked an image");
            // console.log(this.model.toJSON());
            // this.$el.toggleClass('uk-active');
            // $(e.currentTarget).toggleClass('image-checkbox-checked');
            // var $radio = $(e.currentTarget).find('input:radio');
            // $radio.attr("checked", !$radio.attr("checked"));

            e.preventDefault();
        }
    });
})(jQuery);