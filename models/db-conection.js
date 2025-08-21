import mysql2 from "mysql2";

var db = mysql2.createConnection({
    host: 'localhost',
    user: 'dba_umg_boca',
    password: 'dba_umg_boca',
    database: 'db_estudiantes'
});

db.connect(function (err) {
    if (err) {
        console.error('Error en la conexion: ' + err.stack);
        return;
    }

    console.log('Conexion exitosa ID: ' + db.threadId);
});

export { db };