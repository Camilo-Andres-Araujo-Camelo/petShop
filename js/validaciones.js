// Como se usó en un princiio el addEventListener

/* const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (event) => {
  validarFechaNacimiento(event.target);
});
 */

// Usando data-attributes para mejorar código de validaciones y reutilizarlo

export const valida = (input) => {
  const tipoDeInput = input.dataset.tipo;
  // console.log(tipoDeInput);
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  // modificando clase del div que contiene el input
  const parent = input.parentElement;
  if (input.validity.valid) {
    parent.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    parent.classList.add('input-container--invalid');
    //En caso de error
    input.parentElement.querySelector('.input-message-error').innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
};

const tipoDeErrores = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const mensajesDeError = {
  nombre: {
    valueMissing: 'El campo nombre no puede estar vacío',
  },
  email: {
    valueMissing: 'El campo email no puede estar vacío',
    typeMismatch: 'El correo no es válido',
  },
  password: {
    valueMissing: 'El campo password no puede estar vacío',
    patternMismatch:
      'Al menos 6 caracteres máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales',
  },
  nacimiento: {
    valueMissing: 'El campo nacimiento no puede estar vacío',
    customError: 'Debes tener al menos 18 años',
  },
  telefono: {
    valueMissing: 'El campo teléfono no puede estar vacío',
    patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números',
  },
  direccion: {
    valueMissing: 'El campo dirección no puede estar vacío',
    patternMismatch: 'La dirección debe tener entre 10 y 40 caracteres',
  },
  ciudad: {
    valueMissing: 'El campo ciudad no puede estar vacío',
    patternMismatch: 'La ciudad debe tener entre 10 y 40 caracteres',
  },
  departamento: {
    valueMissing: 'El campo departamento no puede estar vacío',
    patternMismatch: 'El departamento debe tener entre 10 y 40 caracteres',
  },
};

const validadores = {
  nacimiento: (input) => validarFechaNacimiento(input),
};

const mostrarMensajeDeError = (tipoDeInput, input) => {
  let mensaje = '';
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      // console.log(error);
      // console.log(input.validity[error]);
      // console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
};

const validarFechaNacimiento = (input) => {
  const fechaInput = new Date(input.value);
  if (!validarMayoriaEdad(fechaInput)) {
    input.setCustomValidity('Debes tener al menos 18 años');
  } else {
    input.setCustomValidity('');
  }
};

const validarMayoriaEdad = (fechaUsuario) => {
  const fechaActual = new Date();
  const fechaUsuarioMas18 = new Date(
    fechaUsuario.getUTCFullYear() + 18,
    fechaUsuario.getUTCMonth(),
    fechaUsuario.getUTCDate()
  );
  // console.log(fechaUsuarioMas18 <= fechaActual);
  return fechaUsuarioMas18 <= fechaActual;
};
