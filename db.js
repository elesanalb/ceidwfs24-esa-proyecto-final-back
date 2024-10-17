import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

function conectar(){
    return postgres(
        {
            host : process.env.DB_HOST,
            database : process.env.DB_NAME,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD
        }
    );
}




export function productos(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT 
                                                productos.id,
                                                productos.producto,
                                                productos.precio,
                                                productos.max,
                                                productos.units,
                                                mercados.mercado,
                                                prioridad.prioridad
                                            FROM productos
                                            JOIN mercados ON
                                                productos.mercado = mercados.id
                                            JOIN prioridad ON
                                                productos.prioridad = prioridad.id
                                            `;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "productos mercados db error" });
            console.log(error);
        }
    })
}



export function productosDB(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT * FROM productos`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "productos db error" });
        }
    });
}



export function mercados(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT * FROM mercados`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "productos db error" });
        }
    });
}



export function prioridad(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();
            
            let resultado = await conexion `SELECT * FROM prioridad`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "prioridad productos db error" });
        }
    });
}



export function maxCompra(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE maxcompra
                                            
                                            `;
            conexion.end();
            ok(resultado);

            /*
            SELECT
                                                maxcompra.id,
                                                maxcompra.max,
                                                productos.producto
                                            FROM maxcompra 
                                            INNER JOIN productos
                                                maxcompra.productos = productos.id
             */
            
            /*
            `SELECT 
                estudiantes.id,
                estudiantes.nombre,
                aulas.nombre 
            AS aula FROM estudiantes 
            INNER JOIN aulas ON 
                estudiantes.aula = aulas.id
            WHERE estudiantes.aula = ?`
            */


        }catch(error){
            console.log(error)
            ko({ error : "max compra db error" });
        }
    })
}



export function addProducto(producto,mercado,precio,prioridad,max,units){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO productos 
                                                (producto,mercado,precio,prioridad,max,units) 
                                            VALUES
                                                (${producto},${mercado},${precio},${prioridad},${max},${units})`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "add producto db error" });
            console.log(error);
        }
    });
}



export function addMercado(mercado){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO mercados (mercado) VALUES (${mercado})`;

            conexion.end();
            ok(resultado);

            
        }catch(error){
            ko({ error : "add mercado db error" });
        }
    });
}



export function addPrioriad(prioridad){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO prioridad (prioridad) VALUES (${prioridad})`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "add prioridad db error" });
        }
    });
}



export function delProducto(id){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `DELETE FROM productos WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "del producto db error" });
        }
    });
}



export function updateProducto({id,producto}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET producto = ${producto} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update producto db error" });
            console.log(error);
        }
    })
}



export function updateMercado({id,mercado}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET mercado = ${mercado} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            //console.log(error);
            ko({ error : "update mercado db error" });
        }
    });
}



export function updatePrecio({id,precio}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET precio = ${precio} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update precio db error" });
        }
    });
}



export function updateMax({id,max}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();
            
            let resultado = await conexion `UPDATE productos SET max = ${max} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update max db error" });
        }
    });
}



export function updatePrioridad({id,prioridad}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();
            
            let resultado = await conexion `UPDATE productos SET prioridad = ${prioridad} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update prioridad db error" });
        }
    });
}



export function editPrioridad({id,prioridad}){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE prioridad SET prioridad = ${prioridad} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update prioridad db error" });
        }
    });
}





/*
productos()
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
productosDB()
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
mercados()
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
prioridad()
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
maxCompra()
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
delProducto(1)
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
addProducto(
    { 
        producto : "Mantequilla",
        mercado : 1,
        precio : 1.9,
        prioridad : 2,
        max : 2
    }
)
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
addMercado("Lidl")
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
addPrioriad("urgente")
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
updatePrecio(
    {
        id : 3,
        precio : 2.99
    }
)
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
updateMax(
    {
        id : 3,
        max : 4
    }
)
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
updatePrioridad(
    {
        id : 4,
        prioridad : 2, 
    }
)
.then( x => console.log(x))
.catch( x => console.log(x));
*/

/*
editPrioridad(
    {
        id : 3,
        prioridad : "importante"
    }
)
.then( x => console.log(x))
.catch( x => console.log(x));
*/


/*

`SELECT 
    estudiantes.nombre,
    estudiantes.edad,
    aulas.nombre 
AS aula FROM estudiantes
INNER JOIN aulas ON 
    estudiantes.aula = aulas.id 
WHERE estudiantes.id = ?`
*/