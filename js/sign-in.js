$(function() {
    $('.tab-link').on('click', function(e) {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        var href = $(this).attr('href');
        $('.forms > form').hide();
        $(href).fadeIn(500);
    });
});

/* $.validate({
    modules: 'security, toggleDisabled',
    lang: 'en',
    errorMessagePosition: 'top',
}); */

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

function redirectUser(isValidUser){
    window.location.replace("./board.html");
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