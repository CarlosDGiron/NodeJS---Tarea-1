import express, { json } from "express";
import { crudEstudiantes } from "./controllers/crud_estudiantes.js";

const app_e = express();

app_e.use(express.urlencoded({extended:false}));
app_e.use(json());
app_e.use(express.static('./views'))
app_e.use(express.static('./models'))
app_e.use(express.static('./controllers'))

//motor de vistas
app_e.set('view engine', 'ejs');

app_e.listen('5000', function () {
    console.log('Aplicación Iniciada : http://localhost:5000/');
});

app_e.get('/', crudEstudiantes.read)

app_e.post('/crud_estudiantes', crudEstudiantes.cud)