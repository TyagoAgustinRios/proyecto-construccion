const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());


const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Construccion123', 
    database: 'mydb' 
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a MySQL:', error);
        return;
    }
    console.log('Conectado exitosamente a mydb');
});

const PORT = 3000;

// 1. RUTA: Registrar un alumno
app.post("/alumnos", (req, res) => {
    const { DNI, Nombre, Apellido, Curso, Año, Email } = req.body;

    if (!DNI || !Nombre || !Email) {
        return res.status(400).json({ error: "DNI, Nombre y Email son obligatorios" });
    }

    const consulta = 'INSERT INTO alumno (DNI, Nombre, Apellido, Curso, Año, Email) VALUES (?, ?, ?, ?, ?, ?)';

    conexion.query(consulta, [DNI, Nombre, Apellido, Curso, Año, Email], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al registrar el alumno" });
        }
        res.status(201).json({
            mensaje: "Alumno registrado correctamente",
            dni: DNI
        });
    });
});

// 2. RUTA: Consultar todos los alumnos 
app.get("/alumnos", (req, res) => {
    conexion.query('SELECT * FROM alumno', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener alumnos" });
        }
        res.json(resultados);
    });
});

// 3. RUTA: Verificar si el alumno tiene netbook asignada
app.get("/netbook/:dni", (req, res) => {
    const dniAlumno = req.params.dni;
    // Nota: Asegúrate de que en tu tabla 'netbook' la columna se llame DNI o Alumno_DNI
    const consulta = 'SELECT * FROM netbook WHERE DNI = ?'; 

    conexion.query(consulta, [dniAlumno], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: "Error al consultar la tabla netbook" });
        }
        if (resultados.length > 0) {
            res.json({ tieneNetbook: true, netbook: resultados[0] });
        } else {
            res.json({ tieneNetbook: false, mensaje: "El alumno no posee netbook asignada" });
        }
    });
});

// 4. RUTA: Registrar una solicitud 
app.post("/solicitudes", (req, res) => {
    const { Tipo, Fecha, Estado, DNI, ID_Admin } = req.body;
    const consulta = 'INSERT INTO solicitud (Tipo, Fecha, Estado, DNI, ID_Admin) VALUES (?, ?, ?, ?, ?)';

    conexion.query(consulta, [Tipo, Fecha, Estado, DNI, ID_Admin], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al crear la solicitud" });
        }
        res.status(201).json({
            mensaje: "Solicitud registrada correctamente",
            id: resultado.insertId
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});