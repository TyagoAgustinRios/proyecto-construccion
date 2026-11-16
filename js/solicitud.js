const formSolicitud = document.getElementById("formSolicitud");
const inputNombre = document.getElementById("nombreAlumno");
const inputDni = document.getElementById("dniAlumno");
const inputClave = document.getElementById("claveVerificacion");
const btnVerClave = document.getElementById("btnVerClave");
const inputConstancia = document.getElementById("constancia");
const selectMotivo = document.getElementById("motivo");
const campoDescripcion = document.getElementById("campoDescripcion");

// 1. Mostrar / Ocultar Clave Provisional
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

// 2. Efectos visuales Focus y Blur en los inputs
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

// 3. Validación visual al subir archivo de constancia
if (inputConstancia) {
  inputConstancia.addEventListener("change", () => {
    console.log("Formatos que acepta este input:", inputConstancia.accept);
    if (inputConstancia.files.length > 0) {
      console.log("Archivo subido:", inputConstancia.files[0].name);
      inputConstancia.style.border = "2px solid green";
    }
  });
}

// 4. Mostrar campo extra si elige "Otro motivo" (Requisito del proyecto)
if (selectMotivo && campoDescripcion) {
  selectMotivo.addEventListener("change", () => {
    campoDescripcion.style.display = selectMotivo.value === "Otro motivo" ? "block" : "none";
  });
}

// 5. Envío del formulario al Backend (Node.js + MySQL)
if (formSolicitud) {
  formSolicitud.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valorNombre = inputNombre ? inputNombre.value.trim() : "Alumno";
    const valorDni = inputDni.value.trim();

    if (valorDni === "") {
      alert("Por favor complete el DNI del alumno.");
      return;
    }

    const fechaHoy = new Date().toISOString().split("T")[0];

    try {
      // Paso A: Verificar en MySQL si ya tiene netbook asignada
      const resVerif = await fetch(`http://localhost:3000/netbook/${valorDni}`);
      const dataVerif = await resVerif.json();

      let avisoNetbook = "";
      if (dataVerif.tieneNetbook) {
        avisoNetbook = "\n(Nota: El alumno ya registra una netbook asignada previamente).";
      }

      // Paso B: Guardar la solicitud en la tabla 'solicitud'
      const resSol = await fetch("http://localhost:3000/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Tipo: "Nueva",
          Fecha: fechaHoy,
          Estado: "Pendiente",
          DNI: valorDni,
          ID_Admin: null
        })
      });

      if (resSol.ok) {
        const respuesta = await resSol.json();
        alert(`¡Solicitud guardada en la base de datos con éxito para ${valorNombre}! (ID: ${respuesta.id})${avisoNetbook}`);
        formSolicitud.reset();
        if (inputConstancia) inputConstancia.style.border = "";
        if (campoDescripcion) campoDescripcion.style.display = "none";
      } else {
        const errorData = await resSol.json();
        alert(`Error al guardar: ${errorData.error}. Asegúrate de que el DNI esté registrado.`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor Node.js. Verifica que esté encendido.");
    }
  });
}