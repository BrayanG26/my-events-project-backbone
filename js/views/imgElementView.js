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
            /*$(".image-checkbox").each(function() {
                console.log(this);
                if ($(this).find('input:radio').first().attr("checked")) {
                    $(this).addClass('image-checkbox-checked');
                } else {
                    $(this).removeClass('image-checkbox-checked');
                }
            });*/
        },

        render: function() {
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(this.template(this.model.attributes));

            return this;
        },
        checkImage: function(e) {
            console.log($(e.target));            
            if($(e.target).is('label')){
                console.log("click on label");
                $(e.target).toggleClass('image-checkbox-checked');
                var $radio = $(e.target).find('input:radio');
                
                $radio.attr("checked", !$radio.attr("checked"));
            }
            
            e.preventDefault();
        }
    });
})(jQuery);