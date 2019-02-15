$(function() {
    Utils.validateForm();
    // Attach submit function to submit event to forms
    $(".submit-form").submit(Utils.submitForms);
    /* $('.tab-link').on('click', function(e) {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        var href = $(this).attr('href');
        $('.forms > form').hide();
        $(href).fadeIn(500);
    }); */

    /*$('input[type=submit]').on('click', function(e) {
        var parentClass = $(e.target).parent().attr('class');
        var userToJSON = {};
        var dataString = '';
        if (parentClass.includes("login")) {
            dataString = 'data-login'
        } else if (parentClass.includes("signup")) {
            dataString = 'data-signup'
        }
        $('input[' + dataString + ']').each(function() {
            userToJSON[$(this).attr(dataString)] = $(this).val();
        });
        console.log(userToJSON);
    });*/
});

var Utils = (function($, request) {
    
    var validateForm = function() {
        $.validate({
            modules: 'security, toggleDisabled',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    };

    var getEventosByUser = function(email) {
        var data = {};

    }

    var submitForms = function(event) {
        var idForm = $(event.target).attr('id');
        var dataObject = {},dataString = '',verb = 'GET';
        event.preventDefault();
        console.log(idForm);
        switch (idForm) {
            case "login":
                dataString = 'data-login';
                dataObject.action = 'login';
                break;
            case "signup":
                dataString = 'data-signup';
                dataObject.action = 'signup';
                verb = 'POST';
                break;
            case "new-event":
                dataString = 'data-new-event';
                dataObject.action = 'addEvent';
                verb = 'POST';
                break;
            default:
                break;
        }
        $('input[' + dataString + ']').each(function() {
            dataObject[$(this).attr(dataString)] = $(this).val();
        });
        $(this)[0].reset();
        console.log(dataObject);
        // controller.logInUSer(request.send(verb, dataObject));
    }
    return {
        submitForms: submitForms,
        validateForm:validateForm
    };
})(window.jQuery, Requests);