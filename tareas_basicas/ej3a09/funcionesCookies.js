//DEFINICIONES DE FUNCIONES UTILES PARA TRABAJAR CON COOKIES

//Crea una nueva cookie indicando en cuantos días expirará, si no se indica, expirará al terminar la sesión
function setCookie(nombre, valor, diasExp) {
    const d = new Date();
    d.setTime(d.getTime() + (diasExp*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
}

//Crea una nueva cookie indicando la fecha de expiracion en formato UTC
function setCookieFechaExp(nombre, valor, fechaExp) {
    let expires = "expires="+ fechaExp;
    document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
}

//Crea una nueva cookie indicando la fecha de expiracion en formato "yyyy:mm:dd"
function setCookieFechaExpYMD(nombre, valor, fechaExp) {
    const d = new Date(fechaExp);
    let expires = "expires="+ d.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
}

//Crea una nueva cookie y aparte guarda el valor de su fecha de expiración en otra cookie
function setCookieSaveFecha(nombre, valor, diasExp) {
    const d = new Date();
    d.setTime(d.getTime() + (diasExp*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
    document.cookie = `${nombre}FechaExp` + "=" + d.toUTCString() + ";" + expires + ";path=/";
}

//Devuelve el valor de una cookie
function getCookie(nombre) {
    let name = nombre + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Elimina una cookie
function deleteCookie(nombre) {
    setCookie(nombre, "", 0);
}

//Elimina una cookie, y tambien la cookie que guardaba su fecha de expiración
function deleteCookieSaveFecha(nombre) {
    setCookie(nombre, "", 0);
    setCookie(`${nombre}FechaExp`, "", 0);
}

//Modifica el valor de la cookie existente conservando la fecha de expiración, si no se hiciera así, la cookie expiraria al terminar la sesion
function modificarCookie(nombre, valor) {
    let fechaExp = getCookie(`${nombre}FechaExp`);
    setCookieFechaExp(nombre, valor, fechaExp);
}



//UTILIZANDO LAS FUNCIONES PARA EL EJERCICIO
let confirmacion = window.confirm("Este sitio web usa cookies.");

if (confirmacion == true) {
    if (getCookie("visita") == "") {
        setCookieSaveFecha("visita", 1, 365);
        console.log(document.cookie);
    } else {
    modificarCookie("visita", parseInt(getCookie("visita"))+1);
    console.log(document.cookie);
    }
    document.getElementById("contador").innerHTML = "Has visitado este lugar " + getCookie("visita") +  (getCookie("visita") == 1 ? " vez." : " veces.");
} else {
  deleteCookieSaveFecha("visita");
  console.log(document.cookie);
  document.getElementById("contador").innerHTML = "Se han borrado las cookies.";
}
