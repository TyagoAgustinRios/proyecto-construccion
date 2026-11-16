const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu_password_aqui', // <-- CAMBIA POR TU CONTRASEÑA DE MYSQL
    database: 'mydb'
});

conexion.connect((err) => {
    if (err) console.error('Error de conexión MySQL:', err);
    else console.log('Conectado exitosamente a mydb');
});

// ================= 1. ALUMNOS =================
app.get("/alumnos", (req, res) => {
    conexion.query('SELECT * FROM alumno', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/alumnos", (req, res) => {
    const { DNI, Nombre, Apellido, Curso, Año, Email } = req.body;
    const sql = 'INSERT INTO alumno (DNI, Nombre, Apellido, Curso, Año, Email) VALUES (?, ?, ?, ?, ?, ?)';
    conexion.query(sql, [DNI, Nombre, Apellido, Curso, Año, Email], (err) => {
        if (err) return res.status(500).json({ error: "Error al registrar alumno" });
        res.status(201).json({ mensaje: "Alumno registrado correctamente", dni: DNI });
    });
});

// ================= 2. NETBOOKS =================
app.get("/netbook/:dni", (req, res) => {
    conexion.query('SELECT * FROM netbook WHERE DNI = ?', [req.params.dni], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error al buscar netbook" });
        if (rows.length > 0) res.json({ tieneNetbook: true, netbook: rows[0] });
        else res.json({ tieneNetbook: false, mensaje: "No posee netbook asignada" });
    });
});

// ================= 3. SOLICITUDES =================
app.get("/solicitudes", (req, res) => {
    conexion.query('SELECT * FROM solicitud', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/solicitudes", (req, res) => {
    const { Tipo, Fecha, Estado, DNI, Motivo, Descripción } = req.body;
    const sql = 'INSERT INTO solicitud (Tipo, Fecha, Estado, DNI) VALUES (?, ?, ?, ?)';
    
    conexion.query(sql, [Tipo, Fecha, Estado, DNI], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al guardar solicitud" });
        
        const nuevoId = result.insertId;

        // Si es solicitud de nueva netbook, guarda también en la tabla especializada
        if (Tipo === 'Nueva' && Motivo) {
            const sqlDetalle = 'INSERT INTO solicitud_nueva_notebook (ID_Solicitud, Motivo, Descripción) VALUES (?, ?, ?)';
            conexion.query(sqlDetalle, [nuevoId, Motivo, Descripción || ''], () => {});
        }

        res.status(201).json({ mensaje: "Solicitud registrada correctamente", id: nuevoId });
    });
});

// ================= 4. DESBLOQUEOS =================
app.get("/desbloqueos", (req, res) => {
    conexion.query('SELECT * FROM desbloqueo', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/desbloqueos", (req, res) => {
    const { Código_Desbloqueo, Fecha_Envio, ID_Solicitud, ID_Netbook } = req.body;
    const sql = 'INSERT INTO desbloqueo (Código_Desbloqueo, Fecha_Envio, ID_Solicitud, ID_Netbook) VALUES (?, ?, ?, ?)';
    conexion.query(sql, [Código_Desbloqueo, Fecha_Envio, ID_Solicitud, ID_Netbook], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al registrar desbloqueo" });
        res.status(201).json({ mensaje: "Código de desbloqueo generado", id: result.insertId });
    });
});

// ================= 5. CERTIFICADOS =================
app.post("/certificados", (req, res) => {
    const { Archivo, Fecha_Subida, DNI } = req.body;
    const sql = 'INSERT INTO certificado (Archivo, Fecha_Subida, DNI) VALUES (?, ?, ?)';
    conexion.query(sql, [Archivo, Fecha_Subida, DNI], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al guardar certificado" });
        res.status(201).json({ mensaje: "Certificado cargado", id: result.insertId });
    });
});

// ================= 6. LOGIN ADMINISTRADOR =================
app.post("/login", (req, res) => {
    const { Email, Contraseña } = req.body;
    conexion.query('SELECT * FROM administrador WHERE Email = ? AND Contraseña = ?', [Email, Contraseña], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });
        if (rows.length > 0) res.json({ mensaje: "Bienvenido", admin: rows[0] });
        else res.status(401).json({ error: "Credenciales incorrectas" });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});