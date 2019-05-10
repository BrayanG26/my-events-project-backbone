var app = app || {};

(function($) {
    app.imgView = Backbone.View.extend({
        tagName: 'div',
        className: 'img-container col-25',
        template: _.template($('#image-thumbnail').html()),

        events: {
            'click .image-checkbox': 'checkImage'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            /*$(".image-checkbox").each(function() {
                console.log(this);
                if ($(this).find('input:radio').first().attr("checked")) {
                    $(this).addClass('image-checkbox-checked');
                } else {
                    $(this).removeClass('image-checkbox-checked');
                }
            });*/
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes));

            return this;
        },
        checkImage: function(e) {
            this.model.setAsCover();

            // $(e.currentTarget).toggleClass('image-checkbox-checked');
            // var $radio = $(e.currentTarget).find('input:radio');
            // $radio.attr("checked", !$radio.attr("checked"));

            e.preventDefault();
        }
    });
})(jQuery);