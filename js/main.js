let btnAgregar = document.getElementById("btnAgregar");  //para mandar a llamar los botones del html
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");  //para mandar a llamar los campos que estan en el html
let txtNumber = document.getElementById("Number");

let alertVlidaciones = document.getElementById("alertValidaciones"); //mandar a llamar las alertas cuando los datos no son corectos del html
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let isValid = true;
let precio;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

//aqui se almacena la informacionde la tabla
let datos = new Array(); //arreglo para JSON

function validarCantidad() {  //se crea una funcion para que en el campo de la cantidad sea mayor a cero
    if (txtNumber.value.length == 0) {
        return false;
    }//if length
    if (isNaN(txtNumber.value)) {   //isNaN es para que el campo solo acepte numeros y no letras
        return false;
    }//is NaN
    if (Number(txtNumber.value) <= 0) {     //para que sea numero positivos mayores a cero
        return false;
    } // <=0
    return true;
}//validarCantidad

function getPrecio() {
    return Math.floor((Math.random() * 10000)) / 100;    //math random da un numero aleatorio de 0 al 1
}//get precio

btnAgregar.addEventListener("click", function (event) {   //funciones para el boton de agregar
    event.preventDefault();

    alertValidacionesTexto.innerHTML = "";  //con este se borra los datos cada vez  que se le da el boton agregar
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    isValid = true;

    if (txtNombre.value.length < 3) {  //el 3 indica el numero minomo que acepta el campo
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto<br/>";  //mensaje que mostrara si el campo no cumple
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red medium"; //para marcas en rojo que parte esta incorrecto
        isValid = false;
    }//length<3

    if (!validarCantidad()) {
        alertValidacionesTexto.innerHTML += "El <strong>Numero</strong> no es correcto";  //el signo + sirve para concatenar y en caso que tambien el campo de nombre es incorrecto tambien se le agregue este mensaje
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red medium";
        isValid = false;

    }//!validarCantidad

    if (isValid) {
        contador++;
        precio = getPrecio();
        let row = `<tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
    </tr>`;

        let elemento = `{"id":${contador} ,
        "nombre": "${txtNombre.value}", 
        "cantidad": "${txtNumber.value}",
        "precio": ${precio}
        }`;
        datos.push(JSON.parse(elemento)); //del 77 al 82, ya esan los datos
        localStorage.setItem("datos", JSON.stringify(datos));   //despues de hacer JSON se hace esto para guardarlo en localstorage

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);  //va sumando el total de productos 
        costoTotal += precio * parseFloat(txtNumber.value); //va multiplicando la cantidad de productos con el precio unitario
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`; // toFixed indica cuantos decimales quieres
        localStorage.setItem("contador", contador); //localstorage para guardar la informaciony no se borre
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);
        txtNombre.value = "";  //una vez que se agrega los productos, el nombre se limpia para que se pueda agregar otra cosa
        txtNumber.value = "";  //lo mismo que arriba
        txtNombre.focus(); //focus hace que se regrese al primer campo

    } //isValid

}); //btnAgregar

btnClear.addEventListener("click", function (event) {   //funciones para el boton de limpiar
    event.preventDefault();

    txtNombre.value = "";  //renglon 15 y 16, comandos para mandar a limpiar
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML = "";
    alertVlidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    cuerpoTabla.innerHTML = "";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    localStorage.setItem("contador", contador); 
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal,toFixed(2)}`;
});//btnClear

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("contador") != null) {
        contador = Number(this.localStorage.getItem("contador"));  //todos los elementos en el loca stoge se guardan como una cadena, entonces se convierte el resultado en numero, por eso se puso Number
    } //if contador

    if (this.localStorage.getItem("totalEnProductos") != null) {
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    } //if totalEnProductos

    if (this.localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }// if costoTotal

    if (this.localStorage.getItem("datos") != null) {  //para que se vea la tabla abajo
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
        </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }// if datos

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
}); //windowload

