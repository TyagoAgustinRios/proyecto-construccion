const formConsulta = document.getElementById("formConsulta");
const selectMotivo = document.getElementById("motivo");
const divOtroMotivo = document.getElementById("otroMotivo");
const resultadoDiv = document.getElementById("resultadoConsulta");

// 1. Mostrar u ocultar el campo "Describa la situación" si elige "Otro motivo"
if (selectMotivo && divOtroMotivo) {
    selectMotivo.addEventListener("change", () => {
        if (selectMotivo.value === "Otro motivo") {
            divOtroMotivo.style.display = "block";
        } else {
            divOtroMotivo.style.display = "none";
        }
    });
}

// 2. Consultar en MySQL si el DNI ya tiene una netbook asignada
if (formConsulta) {
    formConsulta.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dni = document.getElementById("dniConsulta").value.trim();

        if (!dni) {
            alert("Por favor ingrese su DNI.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/netbook/${dni}`);
            const data = await res.json();

            if (res.ok) {
                if (data.tieneNetbook) {
                    resultadoDiv.innerHTML = `
                        <div style="padding: 12px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; color: #92400e;">
                            <strong>Equipo encontrado:</strong> Ya posees una netbook asignada.<br>
                            <strong>Código Hardware:</strong> ${data.netbook.Código_Hardware || data.netbook.codigo_hardware || 'Registrado'}<br>
                            <strong>Estado actual:</strong> ${data.netbook.Estado || data.netbook.estado || 'Asignada'}
                        </div>
                    `;
                } else {
                    resultadoDiv.innerHTML = `
                        <div style="padding: 12px; background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; color: #166534;">
                            <strong>Sin equipo asignado:</strong> ${data.mensaje}. Puedes avanzar con tu solicitud de nueva netbook.
                        </div>
                    `;
                }
            } else {
                resultadoDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            }
        } catch (error) {
            console.error("Error al consultar:", error);
            resultadoDiv.innerHTML = `<p style="color: red;">No se pudo conectar con el servidor Node.js.</p>`;
        }
    });
}