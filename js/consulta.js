const selectMotivo = document.getElementById("motivo");
const campoOtroMotivo = document.getElementById("otroMotivo");
const inputCertificado = document.getElementById("regularidad");


if (campoOtroMotivo) {
  campoOtroMotivo.style.display = "none";
}


if (selectMotivo) {
  selectMotivo.addEventListener("change", () => {
   
    if (selectMotivo.value === "Otro motivo") {
      campoOtroMotivo.style.display = "block";
    } else {
      campoOtroMotivo.style.display = "none";  
    }
  });
}


if (inputCertificado) {
  inputCertificado.addEventListener("change", () => {
    
    const formatosPermitidos = inputCertificado.accept;
    const archivoSubido = inputCertificado.files[0];

    if (archivoSubido) {
      console.log("Archivo seleccionado:", archivoSubido.name);
      console.log("Formatos permitidos en el input:", formatosPermitidos);
      
      
      inputCertificado.style.border = "2px solid green";
    }
  });
}