$(function() {
    $('.tab-link').on('click', function(e) {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        var href = $(this).attr('href');
        $('.forms > form').hide();
        $(href).fadeIn(500);
    });
    
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

/* $.validate({
    modules: 'security, toggleDisabled',
    lang: 'en',
    errorMessagePosition: 'top',
}); */

/*$(".forms__form-element").submit(function(event) {
    var idForm = $(event.target).attr('id');
    var dataToJSON = {};
    var dataString = '';
    event.preventDefault();

    if (idForm.includes("login")) {
        dataString = 'data-login'
    } else if (idForm.includes("signup")) {
        dataString = 'data-signup'
    }
    $('input[' + dataString + ']').each(function() {
        dataToJSON[$(this).attr(dataString)] = $(this).val();
    });
    $(this)[0].reset();
    console.log(dataToJSON);
});*/

/**
 * Take input's information and send as parameters to enviarDatos function
 */
function recogerDatosOrganizador() {
    var userToJSON = {};
    var dataString = 'data-login';
    $('input[' + dataString + ']').each(function() {
        userToJSON[$(this).attr(dataString)] = $(this).val();
    });
    console.log(userToJSON);
    /*if (email == "" || email == null || organizador == "" || organizador == null) {
        console.warn("Error! Some information is missing.");
    } else {
        console.log("Sent!");
        data['email'] = email;
        data['organizador'] = organizador;
        data['sheet'] = 'organizadores';
        cleanInputs();
        saveUserLogin(email);
        enviarDatosOrganizador(data);
        redirectPage();
    }*/

}

/**
 * Save login information using localStorage
 * @param  {string} userMail Validation string for each user
 */
function saveUserLogin(userMail) {
    if (typeof(Storage) !== undefined) {
        localStorage.setItem("user.mail", userMail)
    } else {
        console.error('You must enable third party cookies..')
    }
}

/**
 * Send login data to server 
 * @param  {Object} data Object to be sent
 */
function enviarDatosOrganizador(data) {
    $.ajax({
        type: 'POST',
        url: urlAPI,
        data: data,
        processData: true,
        success: function(data, status, jqXHR) {
            console.log(data);
            console.log(jqXHR);
        },
        error: function() {
            console.error('An error ocurr');
        }

    });

}