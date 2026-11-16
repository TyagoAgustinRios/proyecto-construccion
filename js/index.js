const formulario = document.getElementById('formulario');
const dniInput = document.getElementById('dni');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const cursoInput = document.getElementById('curso');
const anoInput = document.getElementById('año');
const emailInput = document.getElementById('email');
const contenedor = document.getElementById('conte');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const alumno = {
        DNI: dniInput.value,
        Nombre: nombreInput.value,
        Apellido: apellidoInput.value,
        Curso: cursoInput.value,
        Año: anoInput.value,
        Email: emailInput.value
    };

    try {
        const res = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alumno)
        });

        if (res.ok) {
            const respuesta = await res.json();
            contenedor.innerHTML = `<p class="positivo">${respuesta.mensaje}</p>`;
            console.log('Alumno registrado con DNI:', respuesta.dni);
            formulario.reset();
        } else {
            const errorData = await res.json();
            contenedor.innerHTML = `<p class="negativo">${errorData.error}</p>`;
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        contenedor.innerHTML = `<p class="negativo">No se pudo conectar con el servidor.</p>`;
    }
});