var model = {
    init: function () {
        var someLogged = true;
        if (!(sessionStorage && sessionStorage.user)) {
            sessionStorage.data = JSON.stringify({});
            someLogged = false;
        }
        return someLogged;
    },
    add: function (obj) {
        delete obj["isComplete"];
        delete obj.data["action"]; //linea provisional, se eliminara cuando se reciba la respuesta del servidor
        sessionStorage.user = JSON.stringify(obj);
    },
    getUser: function () {
        return JSON.parse(sessionStorage.user);
    }
};

var controller = {
    logInUSer: function (data) {
        if (typeof data == 'object') {
            if (data.isComplete) {
                model.add(data);
            }
        }
        view.renderLoggedUser();
    },
    getLoggedUser: function () {
        return model.getUser();
    },
    init: function () {
        if(model.init()){
            view.redirectUser();
        }else{
            view.init();
        }
    }
};

var view = {
    /** 
     * Estos metodos van enfocados a la visualizacion de las respuestas ajax
     * pero por el momento solo se harán impresiones en consola para validar la funcionalidad
     */
    init: function () {
        console.log('init view...');
    },
    renderLoggedUser: function () {
        var user = controller.getLoggedUser();
        console.log('a user is log in...');
        console.log(user);
    },
    redirectUser:function(){
        $('body').html('');
        console.log("You're already logged in..");
        console.log(controller.getLoggedUser());
    }
};

// controller.init();