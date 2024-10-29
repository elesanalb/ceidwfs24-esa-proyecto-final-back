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



/* ------------------------------------------------------------------------------------------------------------------------ */


/* LEER -------------------------------------------------------- *\
*
*                                                  DB - index
*   - Join productos full info --> productos()     | ok |  ok
*   - Leer tabla productos ------> productosInfo() | ok |  ok
*   - Leer mercados -------------> mercados()      | ok |  ok
*   - Leer prioridad ------------> prioridad()     | ok |  ok
*   - Leer tipos ----------------> tipos()         | ok |  ok
*
* --------------------------------------------------------------- */



export function productos(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT 
                                                productos.id,
                                                productos.producto,
                                                productos.estado,
                                                productos.precio,
                                                productos.preciokg,
                                                productos.max,
                                                productos.units,
                                                productos.frecuencia,
                                                productos.tipo,
                                                mercados.mercado,
                                                prioridad.prioridad,
                                                tipos.tipo,
                                            concat(cantidad,cantidadud) AS cantidad
                                            FROM productos
                                            JOIN mercados ON
                                                productos.mercado = mercados.id
                                            JOIN prioridad ON
                                                productos.prioridad = prioridad.id
                                            JOIN tipos ON
                                                productos.tipo = tipos.id
                                            ORDER BY estado,prioridad ASC
                                            `;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "productos full info db error" });
            console.log(error);
        }
    })
}

/*
productos().then( x => console.log(x)).catch( x => console.log(x));
*/



export function productosInfo(){
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



export function listaCompra(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT 
                                                productos.id,
                                                productos.producto,
                                                productos.estado,
                                                productos.precio,
                                                productos.preciokg,
                                                productos.max,
                                                productos.units,
                                                productos.frecuencia,
                                                productos.tipo,
                                                mercados.mercado,
                                                prioridad.prioridad,
                                                tipos.tipo,
                                            concat(cantidad,cantidadud) AS cantidad
                                            FROM productos
                                            JOIN mercados ON
                                                productos.mercado = mercados.id
                                            JOIN prioridad ON
                                                productos.prioridad = prioridad.id
                                            JOIN tipos ON
                                                productos.tipo = tipos.id
                                            WHERE estado = false
                                            ORDER BY prioridad,mercado ASC
                                            `;

            conexion.end();
            ok(resultado);
            

        }catch(error){
            ko({ error : "productos full info db error" });
            console.log(error);
        }
    })
}

/*
listaCompra(1).then( x => console.log(x)).catch( x => console.log(x))
*/



export function productosFrecuencia(frecuencia,producto,mercado,tipo,prioridad){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = conectar();

            let resultado = await conexion `SELECT 
                                                productos.id,
                                                productos.producto,
                                                productos.estado,
                                                productos.precio,
                                                productos.preciokg,
                                                productos.max,
                                                productos.units,
                                                productos.frecuencia,
                                                productos.tipo,
                                                mercados.mercado,
                                                prioridad.prioridad,
                                                tipos.tipo,
                                            concat(cantidad,cantidadud) AS cantidad
                                            FROM productos
                                            JOIN mercados ON
                                                productos.mercado = mercados.id
                                            JOIN prioridad ON
                                                productos.prioridad = prioridad.id
                                            JOIN tipos ON
                                                productos.tipo = tipos.id
                                            WHERE frecuencia = ${frecuencia}
                                            ORDER BY estado,prioridad,productos.tipo ASC
                                            `;
                                            
            
            conexion.end();
            ok(resultado);

        }catch(error){
            console.log(error)
            ko({ error : "productos frecuencia db error" });
        }
    });
}

/*
productosFrecuencia(2,"ajo").then( x => console.log(x)).catch( x => console.log(x));
*/



export function mercados(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT * FROM mercados`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "mercados db error" });
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
            ko({ error : "prioridad db error" });
        }
    });
}



export function tipos(){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `SELECT * FROM tipos`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "tipos db error"})
        }
    });
}

/*
tipos().then( x => console.log(x)).catch( x => console.log(x));
*/




/* ------------------------------------------------------------------------------------------------------------------------ */


/* CREAR ----------------------------------------------- *\
*
*                                               DB - index
*   - Crear productos ---> addProductos()     | ok |  ok
*       · Más opciones --> addProductoFull()  | ok |  ok
*   - Crear mercados ----> addMercados()      | ok |  ok
*   - Crear prioridad ---> addPrioridad()     | ok |  ok
*   - Crear tipos -------> addTipos()         | ok |  ok
*
* ------------------------------------------------------ */

export function addProducto(producto,estado,precio,mercado,preciokg,cantidad,cantidadud,units,max,prioridad,tipo,frecuencia){
    return new Promise( async (ok,ko) => {
        
        try{
            let conexion = await conectar();

            let [{id}] = await conexion `INSERT INTO productos 
                                                (producto,estado,precio,mercado)
                                            VALUES
                                                (${producto},${estado},${precio},${mercado})
                                            RETURNING id
                                            `;


            let addPrecioKg = await id;

            if( preciokg ){
                addPrecioKg = await conexion `UPDATE productos SET preciokg = ${preciokg} WHERE id = ${id}`;
            }


            let addCantidad = await addPrecioKg;

            if( cantidad ){
                addCantidad = await conexion `UPDATE productos SET cantidad = ${cantidad} WHERE id = ${id}`;
            }


            let addCantidadUd = await addCantidad;

            if( cantidadud ){
                addCantidadUd = await conexion `UPDATE productos SET cantidadud =${cantidadud} WHERE id = ${id}`;
            }

            
            let addUnits = await addCantidadUd;
            
            if( units ){
                addUnits = await conexion `UPDATE productos SET units = ${units} WHERE id = ${id}`
            }


            let addMax = await addUnits;

            if( max ){
                addMax = await conexion `UPDATE productos SET max = ${max} WHERE id = ${id}`;
            }


            let addPrioridad = await addMax;

            if( prioridad ){
                addPrioridad = await conexion `UPDATE productos SET prioridad = ${prioridad} WHERE id = ${id}`;
            }


            let addTipo = await addPrioridad;

            if( tipo ){
                addTipo = await conexion `UPDATE productos SET tipo = ${tipo} WHERE id = ${id}`;
            }


            let addFrecuencia = await addTipo;

            if( frecuencia ){
                addFrecuencia = await conexion `UPDATE productos SET frecuencia = ${frecuencia} WHERE id = ${id}`;
            }
            

            conexion.end();
            ok(id);

            if( preciokg ){
                ok(addPrecioKg)
            }

            if( cantidad ){
                ok(addCantidad)
            }

            if( cantidadud ){
                ok(addCantidadUd)
            }

            if( units ){
                ok(addUnits)
            }

            if( max ){
                ok(addMax)
            }

            if( prioridad ){
                ok(addPrioridad)
            }

            if( tipo ){
                ok(addTipo)
            }

            if( frecuencia ){
                ok(addFrecuencia)
            }



        }catch(error){
            ko({ error : "add producto db error" });
            console.log(error)
        }
    });
}

/*
addProducto({ producto : "merluza", estado : false, precio : 0.6, mercado : 5, preciokg : null, cantidad : 40, cantidadud : "g", units : 2, tipo : 3 }).then( x => console.log()).catch( x => console.log(x));
*/




export function addMercado(mercado){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO mercados (mercado) VALUES (${mercado}) RETURNING id`;

            conexion.end();
            ok(resultado);

            
        }catch(error){
            ko({ error : "add mercado db error" });
        }
    });
}



export function addPrioridad(prioridad){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO prioridad (prioridad) VALUES (${prioridad}) RETURNING id`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "add prioridad db error" });
        }
    });
}



export function addTipo(tipo){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `INSERT INTO tipos (tipo) VALUES (${tipo}) RETURNING id`;

            conexion.end();
            ok(resultado);
            
        }catch(error){
            ko({ error : "add tipos db error" });
        }
    });
}

/*
addTipos("basico").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ------------------------------------------------------------------------------------------------------------------------ */


/* BORRAR ----------------------------------------------- *\
*
*                                           DB - index
*   - Borrar productos --> delProductos() | ok |  ok
*   - Borrar mercados ---> delMercados()  | ok |  ok
*   - Borrar prioridad --> delPrioridad() | ok |  ok
*   - Borrar tipos ------> delTipos()     | ok |  ok
*
* ------------------------------------------------------ */



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



export function delMercado(id){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `DELETE FROM mercados WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "del mercado db error" });
        }
    });
}



export function delPrioridad(id){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `DELETE FROM prioridad WHERE id = ${id}`;

            conexion.end();
            ok(resultado)

        }catch(error){
            ko({ error : "del prioridad db error" });
        }
    });
}

/*
delPrioridad(4).then( x => console.log(x)).catch( x => console.log(x));
*/



export function delTipo(id){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `DELETE FROM tipos WHERE id = ${id}`;

            conexion.end();
            ok(resultado);
            
        }catch(error){
            ko({ error : "del tipo db error" });
        }
    });
}





/* ------------------------------------------------------------------------------------------------------------------------ */


/* ACTUALIZAR ----------------------------------------------- *\
*
*                                                    DB - index
*   - Actualizar productos ----> updateProductos()  | ok |  ok
*   - Actualizar estado -------> updateEstado()     | ok |  ok
*   - Actualizar precio -------> updatePrecio()     | ok |  ok
*   - Actualizar precio/kg ----> updatePrecioKg()   | ok |  ok
*   - Actualizar mercado ------> updateMercado()    | ok |  ok
*   - Actualizar cantidad -----> updateCantidad()   | ok |  ok
*   - Actualizar max ----------> updateMax()        | ok |  ok
*   - Actualizar unidades -----> updateUnits()      | ok |  ok
*   - Actualizar prioridad ----> updatePrioridad()  | ok |  ok
*   - Actualizar tipo ---------> updateTipo()       | ok |  ok
*   - Actualizar frecuencia ---> updateFrecuencia() | ok |  ok
*
* ------------------------------------------------------ */



export function updateProducto(id,producto){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET producto = ${producto} WHERE id = ${id}`;
            

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update producto db error" });
        }
    })
}



export function updateEstado(id,estado){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET estado = ${estado} WHERE id =  ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update estado db error" });
        }
    });
}



export function updatePrecio(id,precio){
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



export function updatePrecioKg(id,preciokg){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET preciokg = ${preciokg} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);


        }catch(error){
            ko({ error : "update precio kg db error" });
        }
    });
}



export function updateMercado(id,mercado){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET mercado = ${mercado} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update mercado db error" });
        }
    });
}



export function updateCantidad(id,cantidad,cantidadud){
    return new Promise( async (ok,ko) => {
        console.log(cantidad,cantidadud)

        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET cantidad = ${cantidad}, cantidadud = ${cantidadud} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update cantidad db error" });
            console.log(error)
        }
    });
}

/*
updateCantidad(50,"30").then( x => console.log(x)).catch( x => console.log(x));
*/



export function updateMax(id,max){
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



export function updateUnits(id,units){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();
            
            let resultado = await conexion `UPDATE productos SET units = ${units} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update units db error" });
        }
    });
}



export function updatePrioridad(id,prioridad){
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



export function updateTipo(id,tipo){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();
            
            let resultado = await conexion `UPDATE productos SET tipo = ${tipo} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update tipo db error" });
        }
    });
}

/*
updateTipo("1").then( x => console.log(x)).catch( x => console.log(x));
*/



export function updateFrecuencia(id,frecuencia){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE productos SET frecuencia = ${frecuencia} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "update frecuencia db error" });
        }
    });
}




/* ------------------------------------------------------------------------------------------------------------------------ */

/* EDITAR ----------------------------------------------- *\
*
*                                            DB - index
*   - Editar mercados ---> editMercados()  | ok |  ok
*   - Editar prioridad --> editPrioridad() | ok |  ok
*   - Editar tipos ------> editTipos()     | ok |  ok
*
* ------------------------------------------------------ */



export function editMercados(id,mercado){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE mercados SET mercado = ${mercado} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "edit mercados db error" });
        }
    });
}



export function editPrioridad(id,prioridad){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE prioridad SET prioridad = ${prioridad} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "edit prioridad db error" });
        }
    });
}



export function editTipos(id,tipo){
    return new Promise( async (ok,ko) => {
        try{
            let conexion = await conectar();

            let resultado = await conexion `UPDATE tipos SET tipo = ${tipo} WHERE id = ${id}`;

            conexion.end();
            ok(resultado);

        }catch(error){
            ko({ error : "edit tipos db error" });
        }
    });
}

/*
editTipos(9,"limpieza").then( x => console.log(x)).catch( x => console.log(x));
*/