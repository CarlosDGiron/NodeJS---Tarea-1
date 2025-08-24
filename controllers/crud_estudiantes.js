import express from "express";
import { db } from "../models/db-conection.js";

var crudEstudiantes = ({});

crudEstudiantes.read = (req, res) => {
    db.query("select id_estudiante, carnet, nombres, apellidos, direccion, telefono, correo_electronico, id_tipo_sangre, date_format(fecha_nacimiento,'%d-%m-%Y') as 'fecha_nacimiento' from estudiantes", (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.render("estudiantes/index", { results: results });
        }
    });
}

crudEstudiantes.cud = (req, res) => {
    const btnCrear = req.body.btnCrear;
    const btnElimiar = req.body.btnElimiar;
    const btnModificar = req.body.btnModificar;
    
    const id_estudiante = req.body.txtID;
    const carnet = req.body.txtCarnet;
    const nombres = req.body.txtNombres;
    const apellidos = req.body.txtApellidos;
    const direccion = req.body.txtDireccion;
    const telefono = req.body.txtTelefono;
    const correo_electronico = req.body.txtCorreoElectronico;
    const id_tipo_sangre = req.body.sltcTipoSangre;
    const fecha_nacimiento = req.body.txtFechaNacimiento;
    console.log(id_estudiante+" - "+carnet+" - "+nombres+" - "+apellidos+" - "+direccion+" - "+telefono+" - "+correo_electronico+" - "+id_tipo_sangre+" - "+fecha_nacimiento);
                    
    if (btnCrear) {
        db.query('insert into estudiantes set ?',
            { carnet: carnet, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, correo_electronico: correo_electronico, id_tipo_sangre: id_tipo_sangre, fecha_nacimiento: fecha_nacimiento },
            (error, result) => {
                if (error) {
                    console.log("Error en crudEstudiantes.cud - Crear :" + error);
                } else {
                    res.redirect('/');
                }
            });
    }
    if (btnElimiar) {
        db.query('delete from estudiantes where id_estudiante=?',
            { id_estudiante:id_estudiante },
            (error, result) => {
                if (error) {
                    console.log("Error en crudEstudiantes.cud - Eliminar:" + error);
                } else {
                    res.redirect('/');
                }
            });
    }
    if (btnModificar) {
        db.query('update estudiantes set ? where id_estudiante=?',
             [{carnet: carnet, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, correo_electronico: correo_electronico, id_tipo_sangre: id_tipo_sangre, fecha_nacimiento: fecha_nacimiento },id_estudiante],
            (error, result) => {
                if (error) {
                    console.log("Error en crudEstudiantes.cud - Modificar :" + error);
                } else {
                    res.redirect('/');
                }
            });
    }
}

export { crudEstudiantes }