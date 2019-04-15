$(function() {
    Utils.validateForm();
    // Attach submit function to submit event to forms
    $(".submit-form").submit(Utils.submitForms);
});

var Utils = (function($, request) {

    var validateForm = function() {
        $.validate({
            modules: 'security, toggleDisabled',
            lang: 'en',
            errorMessagePosition: 'top',
        });
    };

    var submitForms = function(event) {
        event.preventDefault();
        var idForm = $(event.target).attr('id'),
            formData = {};
        $(':input', this).each(function(index, input) {
            var inputData = $(input);
            if (inputData.is('input:not(:submit)')) {
                formData[inputData.attr('name')] = inputData.val();
            }
        });
        console.log(formData);
        $(this)[0].reset();
        _sendFormData(formData);
        // controller.logInUSer(request.send(verb, dataObject));
    };

    var _sendFormData = function(data) {
        $.ajax({
            type: 'GET',
            url: app.urlAPI + 'organizadores',
            data: data,
            processData: true,
            success: function(data, status, jqXHR) {
                console.log(data);
                if (data.validation) {
                    localStorage.setItem("idUser", data.idUser);
                    redirectUser(true);
                } else {
                    console.log("usuario no encontrado");
                }
                console.log(jqXHR);
            },
            error: function(error) {
                console.error('An error ocurr');
                console.log(error);
            }

        });
    }
    return {
        submitForms: submitForms,
        validateForm: validateForm
    };
})(window.jQuery, Requests);