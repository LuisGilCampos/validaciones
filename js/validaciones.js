export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message.error").innerHTML = ""
    } else {
        input.parentElement.classList.add(".input-container--invalid");
        input.parentElement.querySelector(".input-message.error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",    
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este Campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este Campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este Campo no puede estar vacio",
        pattrenMismatch: "Al menos 6 caracteres maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este Campo no puede estar vacio",
        customError: 'Estas chavo, chavo',
    }
    numero: {
        valueMissing: "este campo no puede estar vacio"
        patternMissmatch: "el formato requerido es xxxxxxxxxx 10 numeros"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(input.validity[error])
        }
    })

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje =''
    if(mayorDeEdad(fechaCliente)){
        mensaje = 'Estas chavo, chavo'
    }
    input.setCustomValidity(mensaje)
    
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;

    
}