/* 
 * JavaScript module pattern implemented
 * */

var Requests = (function($) {
    var _URLAPI = "https://script.google.com/macros/s/AKfycbzZKsQdwLaPvxD-Vt-HC_4sAnlNAjJQ5p925lVWqAHSCwAENJ4/exec"; //replace for another url if necessary
    var isValidData = function(data) {
        if (typeof data == "object") {
            return data;
        } else {
            return {}
        }
    };

    /**
     * Make an ajax request 
     * @param  {string} TYPE HTTP verb to make the request
     * @param {object} data Object that contains all information
     */
    var sendRequest = function(TYPE, data) {

        try {
            if (typeof TYPE != "string") {
                throw "First argument must be valid string";
            } else if (TYPE.toUpperCase() != "POST") {
                if (TYPE.toUpperCase() != "GET"){
                    throw "Invalid HTTP Verb, must be GET, POST ..."
                }
            }
            if (typeof data != "object") {
                throw "Second argument must be a valid literal object"
            }
            return getResponse(data);
            $.ajax({
                type: TYPE,
                url: _URLAPI,
                data: isValidData(data),
                processData: true,
                success: function(data, status, jqXHR) {
                    console.log(data);
                    console.log(jqXHR);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('An error ocurr ' + textStatus);
                    console.error(' ' + errorThrown);
                }

            })
        } catch (error) {
            console.error(error);
        }
    };

    var guardarEvento = function(data) {

    };

    return {
        send: sendRequest
    };
})(window.jQuery, Requests);

/* Request.methods = {
    guardarEvento: function(data) {
        data.sheet = 'eventos';
        data.estado = 'creado';
        data.email = 'brayang26_@outlook.com'
        inputs.each(function(index) {
            var $input = $(this);
            var id,
                valor;
            id = $input.attr('id');
            valor = $input.val();
            data[id] = valor;
        });
        console.log(data);
        initialIsCheckFilledInputs();
        checkFilledInputs();
        enviarDatosEventos(data);
    }
} */

function getResponse(object){
    var response = {
        isComplete:true
    }
    response.data = object;

    return response;
}