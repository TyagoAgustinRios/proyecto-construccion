const formSolicitud = document.getElementById("formSolicitud");
const inputNombre = document.getElementById("nombreAlumno");
const inputDni = document.getElementById("dniAlumno");
const inputClave = document.getElementById("claveVerificacion");
const btnVerClave = document.getElementById("btnVerClave");
const inputConstancia = document.getElementById("constancia");


if (btnVerClave && inputClave) {
  btnVerClave.addEventListener("click", () => {
    
    if (inputClave.type === "password") {
      inputClave.setAttribute("type", "text");
      btnVerClave.textContent = "Ocultar Clave";
    } else {
      inputClave.setAttribute("type", "password");
      btnVerClave.textContent = "Mostrar Clave";
    }
  });
}


const camposTexto = [inputNombre, inputDni, inputClave];

camposTexto.forEach((campo) => {
  if (campo) {
    
    campo.addEventListener("focus", () => {
      campo.style.borderColor = "#007bff";
      campo.style.backgroundColor = "#eef6ff";
    });

    
    campo.addEventListener("blur", () => {
      campo.style.borderColor = "";
      campo.style.backgroundColor = "";
    });
  }
});


if (inputConstancia) {
  inputConstancia.addEventListener("change", () => {
    
    console.log("Formatos que acepta este input:", inputConstancia.accept);
    
    if (inputConstancia.files.length > 0) {
      console.log("Archivo subido:", inputConstancia.files[0].name);
      inputConstancia.style.border = "2px solid green";
    }
  });
}


if (formSolicitud) {
  formSolicitud.addEventListener("submit", (e) => {
    e.preventDefault();

   
    const valorNombre = inputNombre.value.trim();
    const valorDni = inputDni.value.trim();

    if (valorNombre === "" || valorDni === "") {
      alert("Por favor complete los campos obligatorios.");
    } else {
      alert(`¡Solicitud procesada con éxito para ${valorNombre}!`);
      console.log("Datos enviados:", {
        nombre: valorNombre,
        dni: valorDni,
        tipoInputClave: inputClave.type
      });
      formSolicitud.reset();
    }
  });
}