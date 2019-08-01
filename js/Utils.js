$(function () {
	Utils.validateForm();
	// Attach submit function to submit event to forms
	$(".submit-form").submit(Utils.submitForms);
});

var Utils = (function ($, request) {
	var validateForm = function () {
		$.validate({
			modules: 'security, toggleDisabled',
			lang: 'en',
			errorMessagePosition: 'top',
		});
	};

	var submitForms = function (event) {
		event.preventDefault();
		var idForm = $(event.target).attr('id'),
		formData = {},
		VERB = (idForm == 'login') ? 'GET' : 'POST';
		$(':input', this).each(function (index, input) {
			var inputData = $(input);

			// console.log(inputData.attr('name') + " "+expass.toString());
			if (inputData.is('input:not(:submit)')) {
				if (idForm == 'signup') {
					var expass = inputData.attr('name').includes("npassword"); // excluye el envío del campo para confirmar contraseña
					if (!expass) {
						formData[inputData.attr('name')] = inputData.val();
					}
				} else {
					formData[inputData.attr('name')] = inputData.val();
				}
			}
		});
		console.log(formData);
		$(this)[0].reset();
		_sendFormData(formData, VERB);
		// controller.logInUSer(request.send(verb, dataObject));
	};

	var _sendFormData = function (data, verb) {
		$.ajax({
			type: verb,
			url: app.urlAPI + 'organizadores',
			data: data,
			processData: true,
			success: function (data, status, jqXHR) {
				console.log(data);
				if (data.success) {
					UIkit.notification({
                        message: "<span uk-icon='icon: close'></span> Inició sesión!",
                        status: 'success',
                        pos: 'top-center',
                        timeout: 2600
                    });
					localStorage.setItem("idUser", data.idUser);
					_redirectUser(true);
				} else {
					UIkit.notification({
                        message: "<span uk-icon='icon: close'></span> Algo falló, lo sentimos, intenta de nuevo..",
                        status: 'danger',
                        pos: 'top-center',
                        timeout: 2600
                    });
					console.log("usuario no encontrado");
				}
				console.log(jqXHR);
			},
			error: function (error) {
				console.error('An error ocurr');
				console.log(error);
			}

		});
	}
	var _redirectUser = function (isValidUser) {
		if (isValidUser) {
			window.location.replace("./board.html");
		}
	}
	return {
		submitForms: submitForms,
		validateForm: validateForm
	};
})(window.jQuery, Requests);
