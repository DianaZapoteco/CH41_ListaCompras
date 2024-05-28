let btnAgregar = document.getElementById("btnAgregar");  //para mandar a llamar los botones del html
let btnClear = document.getElementById("btnClear");

let txtNombre =document.getElementById("Name");  //para mandar a llamar los campos que estan en el html
let txtNumber = document.getElementById("Number");

let alertVlidaciones = document.getElementById("alertValidaciones"); //mandar a llamar las alertas cuando los datos no son corectos del html
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad(){  //se crea una funcion para que en el campo de la cantidad sea mayor a cero
    if(txtNumber.value.length==0){
        return false;
    }//if length
    return true;
}//validarCantidad

btnAgregar.addEventListener("click",function(event){   //funciones para el boton de agregar
    event.preventDefault();

    alertValidacionesTexto.innerHTML="";  //con este se borra los datos cada vez  que se le da el boton agregar
        alertValidaciones.style.display="none";
        txtNombre.style.border="";
        txtNumber.style.border="";

    if (txtNombre.value.length<3){  //el 3 indica el numero minomo que acepta el campo
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto<br/>";  //mensaje que mostrara si el campo no cumple
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid red medium"; //para marcas en rojo que parte esta incorrecto
    }//length<3

    if(! validarCantidad()){
        alertValidacionesTexto.innerHTML+="El <strong>Numero</strong> no es correcto";  //el signo + sirve para concatenar y en caso que tambien el campo de nombre es incorrecto tambien se le agregue este mensaje
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red medium";

    }//!validarCantidad

});

btnClear.addEventListener("click",function(event){   //funciones para el boton de limpiar
    event.preventDefault();

    txtNombre.value ="";  //renglon 15 y 16, comandos para mandar a limpiar
    txtNumber.value ="";

});