const formulario = document.querySelector("form");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputMensaje = document.getElementById("mensaje");

const camposFormulario = [inputNombre, inputCorreo, inputMensaje];



camposFormulario.forEach((campo) => {

  campo.addEventListener("mouseover", () => {
    
    campo.style.transform = "scale(1.05)";
    campo.style.transition = "all 0.3s ease";
    campo.style.borderColor = "#007bff";
  });

  campo.addEventListener("mouseout", () => {
  
    campo.style.transform = "scale(1)";
    campo.style.borderColor = "";
  });
});


formulario.addEventListener("submit", (evento) => {
  
  evento.preventDefault();

 
  const valorNombre = inputNombre.value.trim();
  const valorCorreo = inputCorreo.value.trim();
  const valorMensaje = inputMensaje.value.trim();


  if (valorNombre === "" || valorCorreo === "" || valorMensaje === "") {
    alert(" Por favor, completa todos los campos del formulario antes de enviar.");
    
    if (valorNombre === "") inputNombre.style.border = "2px solid red";
    if (valorCorreo === "") inputCorreo.style.border = "2px solid red";
    if (valorMensaje === "") inputMensaje.style.border = "2px solid red";

  } else {
     alert("¡Gracias por tu mensaje! El formulario ha sido enviado correctamente.");
    
   
    console.log("Datos enviados:");
    console.log("Nombre:", valorNombre);
    console.log("Correo:", valorCorreo);
    console.log("Mensaje:", valorMensaje);


    formulario.reset();
    camposFormulario.forEach((campo) => {
      campo.style.border = "";
    });
  }
});