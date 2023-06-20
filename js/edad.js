class Datos {
  constructor(nombre, apellido, telefono, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
  }
}

const datos = [];

function verificarEntero(variable) {
  let valor;
  let cont = true;

  do {
    valor = parseInt(prompt(`Ingrese ${variable}`));
    if (Number.isInteger(valor)) {
      console.log(`La variable ${variable} es entera`);
      cont = false;
    } else {
      alert(`Ingrese números para ${variable}`);
    }
  } while (cont);

  return valor;
}

function verificarTelefono() {
  let telefono = document.getElementById("telefono").value;
  
  if (/^\d+$/.test(telefono)) {
    console.log("El número de teléfono es válido");
    return true;
  } else {
    alert("Ingrese un número de teléfono válido");
    return false;
  }
}

let continuarVerificar = true;
let dia = 0;
let mes = 0;
let año = 0;

if (localStorage.getItem("edadVerificada")) {
  // Si la edad ya ha sido verificada, se obtienen los datos del localStorage
  dia = parseInt(localStorage.getItem("dia"));
  mes = parseInt(localStorage.getItem("mes"));
  año = parseInt(localStorage.getItem("año"));
  continuarVerificar = false; // No se vuelve a solicitar la edad
} else {
  // Si la edad no ha sido verificada, se solicita
  alert("Ingrese su fecha de nacimiento");
  dia = verificarEntero('Día');
  mes = verificarEntero('Mes');
  año = verificarEntero('Año');

  let edad = dia + mes + año;
  if (año < 2005) {
    continuarVerificar = false;
    alert("Su fecha es: " + dia + "/" + mes + "/" + año);
    alert("Puede ingresar al sitio");

    // Almacenar los datos en el localStorage para recordar que la edad ya ha sido verificada
    localStorage.setItem("edadVerificada", "true");
    localStorage.setItem("dia", dia);
    localStorage.setItem("mes", mes);
    localStorage.setItem("año", año);
  } else {
    while (continuarVerificar) {
      alert("No puede ingresar, debe ser mayor de edad");
      continuarVerificar = confirm("salir");
      continuarVerificar = false;
      continuar = false;

      console.log("El año ingresado es: " + edad);
    }
  }
}

console.log(dia, mes, año);

function guardarDatos(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.toUpperCase();
  const apellido = document.getElementById("apellidos").value.toUpperCase();
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value.toUpperCase();

  if (verificarTelefono()) {
    const dato = new Datos(nombre, apellido, telefono, email);
    datos.push(dato);

    document.getElementById("formulario").reset();
    const datosJSON = JSON.stringify(datos);
    localStorage.setItem("datos", datosJSON);
    console.log(datos);
  }
}

// Agregar un listener al evento submit del formulario
document.getElementById("formulario").addEventListener("submit", guardarDatos);