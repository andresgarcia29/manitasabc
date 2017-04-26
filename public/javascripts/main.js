
$(document).ready(function(){
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
    $('select').material_select();

});

$("#ajaxSign").click(function(){
        var user = {
            user_id: 0,
            username : $("#username").val(),
            name : $("#name").val(),
            email : $("#email").val(),
            password : $("#password").val(),
            passwordr: $("#passwordre").val()
        }

        if (user.username.length > 1 && user.name.length > 1 && user.email.length > 1 && user.password.length > 1) {
            if (user.username.length < 4 || user.username.length > 13){
                $('.text-error').fadeOut(0);
                $('.text-error').text("El usuario debe tener entre 3 a 13 letras");
                $('.text-error').fadeIn(2000);
                $('.error').fadeIn(4000);
                return false;
            }
            if(user.name.length < 5 || user.name.length > 30){
                $('.text-error').fadeOut(0);
                $('.text-error').text("Ingrese un nombre valido");
                $('.text-error').fadeIn(2000);
                $('.error').fadeIn(4000);
                return false;
            }
            if(user.password.length < 6){
                $('.text-error').fadeOut(0);
                $('.text-error').text("La contraseña debe ser mayor a 6 caracteres");
                $('.text-error').fadeIn(2000);
                $('.error').fadeIn(4000);
                return false;
            }
            if(user.password !== user.passwordr){
                $('.text-error').fadeOut(0);
                $('.text-error').text("Las contraseña no coinciden");
                $('.text-error').fadeIn(2000);
                $('.error').fadeIn(4000);
                return false;
            }
        }else{
            $('.error').fadeIn(4000);
            $('.text-error').fadeOut(0);
            $('.text-error').text("Completar correctamente los campos");
            $('.text-error').fadeIn(2000);
            return false;
        }
    });





    // function login(user){
    //     $.ajax({
    //         data: user,
    //         url: "/create",
    //         type: "post",
    //         processData: false,
    //         contentType: false,
    //         beforeSend: function(){
    //             console.log("Se esta procesando");
    //         },
    //         crossDomain: true
    //     })
    //     .done(function(data){
    //         console.log("Se ha procesado");
    //     });
    // }
