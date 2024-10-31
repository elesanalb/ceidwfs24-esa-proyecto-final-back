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





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* LEER ------------------------------------------------------------------------------------------------------------------------ *\
*
*                                                                         DB - index
*   - Join productos full info ------> switch for productosFrecuencia() | ok |  ok
*       · Leer tabla productos ------> productosInfo()                  | ok |  ok
*       · Leer lista compra ---------> listacompra()                    | ok |  ok
*       · Leer productos mensuales --> change for productos()           | ok |  ok
*   - Leer mercados -----------------> mercados()                       | ok |  ok
*   - Leer prioridad ----------------> prioridad()                      | ok |  ok
*   - Leer tipos --------------------> tipos()                          | ok |  ok
*
* ------------------------------------------------------------------------------------------------------------------------------ */


/* productos() ------------------------------------------------------------------------- *\

*   ~ JOIN de productos con mercados,prioridad,tipos
*       ~ productos.mercado (int)  = mercados.id ---> returning  mercados.mercado
*       ~ prouctos.prioridad (int) = prioridad.id --> returning  prioridad.prioridad
*       ~ productos.tipo (int)     = tipos.id ------> returning  tipos.tipo
*   ~ CONCAT cantidad,cantidadud --> returning cantidad
*
* -------------------------------------------------------------------------------------- */

/*
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
*/

/*
productos().then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* productosFrecuencia() -------------------------------------------- *\
*
*   ~ Separar por frecuencia (int) --> 1 (mensual) | 2 (ocasional)
*
* ------------------------------------------------------------------- */

export function productos(frecuencia,producto,mercado,tipo,prioridad){
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




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* productosInfo() -------------------------------------------------- *\
*
*   ~ Seleccionar toda tabla sin JOIN
*       ~ Seleccionar mercados,prioridad,tipos desde id
*       ~ Editar mercados,prioridad,tipos cambiando id
*
* --------------------------------------------------------------------*/

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

/*
productosInfo().then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* listaCompra() ----------------------------------------------------- *\
*
*   ~ Selección de productos que hay que comprar --> estado = false
*
* -------------------------------------------------------------------- */

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





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* mercados() ------------------------------------------------------------- *\
*
*   ~ FETCH mercados para crear listas de selección en CREAR | EDITAR
*   ~ FILTER mercados por id (productos.mercado) para devolver mercado
*
* ------------------------------------------------------------------------- */

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

/*
mercados().then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* prioridad() ----------------------------------------------------------------- *\
*
*   ~ FETCH prioridad para crear listas de selección en CREAR | EDITAR
*   ~ FILTER prioridad por id (productos.prioridad) para devolver prioridad
*
* ------------------------------------------------------------------------------ */

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

/*
prioridad().then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* tipos() ------------------------------------------------------------ *\
*
*   ~ FETCH tipos para crear listas de selección en CREAR | EDITAR
*   ~ FILTER tipos por id (productos.tipo) para devolver tipo
*
* ---------------------------------------------------------------------- */

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





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */





/* CREAR --------------------------------------------------------------------------------------------- *\
*
*                                               DB - index
*   - Crear productos ---> addProductos()     | ok |  ok
*   - Crear mercados ----> addMercados()      | ok |  ok
*   - Crear prioridad ---> addPrioridad()     | ok |  ok
*   - Crear tipos -------> addTipos()         | ok |  ok
*
* ---------------------------------------------------------------------------------------------------- */


/* addProducto() ---------------------------------------------------------------------------------------------------------------------- *\
*
*   ~ Crear nuevo producto con campos obligatorios --> producto,estado,precio,mercado
*   ~ Campo opcional --> variable con valor NULL 
*       ~ Si el campo no está vacío --> variable = valor
*
* ------------------------------------------------------------------------------------------------------------------------------------- */

export function addProducto(producto,estado,precio,mercado,preciokg,cantidad,cantidadud,units,max,prioridad,tipo,frecuencia){
    return new Promise( async (ok,ko) => {
        
        try{
            let conexion = await conectar();

            let newpreciokg = null;
            if( preciokg ){
                newpreciokg = preciokg;
            }

            let newcantidad = null;
            if(  cantidad ){
                newcantidad = cantidad;
            }

            let newcantidadud = null;
            if( cantidadud ){
                newcantidadud = cantidadud;
            }

            let newunits = null;
            if( units ){
                newunits = units
            }

            let newmax = null;
            if( max ){
                newmax = max;
            }

            let newprioridad = null;
            if( prioridad ){
                newprioridad = prioridad;
            }

            let newtipo = null;
            if( tipo ){
                newtipo = tipo;
            }

            let newfrecuencia = null;
            if( frecuencia ){
                newfrecuencia = frecuencia;
            }

            
            let [{id}] = await conexion `INSERT INTO productos 
                                                (producto,estado,precio,mercado,preciokg,cantidad,cantidadud,units,max,prioridad,tipo,frecuencia)
                                            VALUES
                                                (${producto},${estado},${precio},${mercado},${newpreciokg},${newcantidad},${newcantidadud},${newunits},${newmax},${newprioridad},${newtipo},${newfrecuencia})
                                            RETURNING id
                                            `;

            

            conexion.end();
            ok(id);


        }catch(error){
            ko({ error : "add producto db error" });
            console.log(error)
        }
    });
}

/*
addProductoPrueba({ producto : "Queso cuña", estado : false, precio : 6.47, mercado : 3}).then( x => console.log(x)).catch( x => console.log(x));
*/




/*
export function addProductoDISCARDED(producto,estado,precio,mercado,preciokg,cantidad,cantidadud,units,max,prioridad,tipo,frecuencia){
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
*/

/*
addProducto({ producto : "merluza", estado : false, precio : 0.6, mercado : 5, preciokg : null, cantidad : 40, cantidadud : "g", units : 2, tipo : 3 }).then( x => console.log()).catch( x => console.log(x));
*/





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* addMercado() ------------------------------------------------------------ *\
*
*   ~ Añadir mercado para selección de mercados en CREAR | EDITAR producto
*
* -------------------------------------------------------------------------- */

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

/*
addMercado("Mercadona").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* addPrioridad ------------------------------------------------------------------ *\
*
*   ~ Añadir prioridad para selección de prioridad en CREAR | EDITAR producto
*
* -------------------------------------------------------------------------------- */

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

/*
addPrioridad("opcional").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* addTipo ------------------------------------------------------------- *\
*
*   ~ Añadir tipo para selección de tipos en CREAR | EDITAR producto
*
* ---------------------------------------------------------------------- */

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





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */





/* BORRAR ----------------------------------------------------------------------------------------------- *\
*
*                                           DB - index
*   - Borrar productos --> delProductos() | ok |  ok
*   - Borrar mercados ---> delMercados()  | ok |  ok
*   - Borrar prioridad --> delPrioridad() | ok |  ok
*   - Borrar tipos ------> delTipos()     | ok |  ok
*
* -------------------------------------------------------------------------------------------------------- */


/* delProducto() ------------------------------------------------------------ */

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

/*
delProducto(1).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* delMercado() ------------------------------------------------------------------ */

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

/*
delMercado(1).then( x => console.log(x)).catch( x = console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* delPrioridad() -------------------------------------------------------------------- */

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




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* delTipo() ------------------------------------------------------------------------- */

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

/*
delTipo(1).then( x => console.log(x)).catch( x => console.log(x));
*/





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */





/* ACTUALIZAR -------------------------------------------------------------------------------------------------------- *\
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
* -------------------------------------------------------------------------------------------------------------------- */


/* updateProducto() -------------------------------------------------------------------------------------------------- */

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

/*
updateProducto(1,"Mantequilla").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateEstado() ------------------------------------------------------------------------------------------------- */

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

/*
updateEstado(1,true).then( x => console.log(x)).catch( x => console.log(x));
*/





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updatePrecio() ------------------------------------------------------------------------------------------- */

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

/*
updatePrecio(1,0.35).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updatePrecioKg() -------------------------------------------------------------------------------------------- */

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

/*
updatePrecioKg(1,1.67).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateMercado() ------------------------------------- *\
*
*   ~ UPDATE productos mercado (int) --> mercados id
*
* ------------------------------------------------------ */

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

/*
updateMercado(1,2).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateCantidad() -------------------------------------------- *\
*
*   ~ UPDATE cantidad y cantidadud --> concat en productos()
*       ~ cantidad ----> número
*       ~ cantidadud --> unidad (kg,l)
*
* -------------------------------------------------------------- */

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




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateMax() ------------------------------------------------------------------------------------ */

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

/*
updateMax(1,2).then( x => console.log(x)).catch( x => console.log(x));
*/





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateUnits() ---------------------------------------------------------------------------------------------- */

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

/*
updateUnits(1,3).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updatePrioridad() ------------------------------------------ *\
*
*   ~ UPDATE productos prioridad (int) --> prioridad id
*
* ------------------------------------------------------------- */

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

/*
updatePrioridad(1,3).then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateTipo() ----------------------------------- *\
*
*   ~ UPDATE producto tipo (int) --> tipos id
*
* ------------------------------------------------- */

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




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* updateFrecuencia() -------------------------------------------------------------------------------------------- */

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

/*
updateFrecuencia(1,2).then( x => console.log(x)).catch( x => console.log(x));
*/





/* ------------------------------------------------------------------------------------------------------------------------ */

/* EDITAR --------------------------------------------------------------------------------------------------------- *\
*
*                                            DB - index
*   - Editar mercados ---> editMercados()  | ok |  ok
*   - Editar prioridad --> editPrioridad() | ok |  ok
*   - Editar tipos ------> editTipos()     | ok |  ok
*
* ----------------------------------------------------------------------------------------------------------------- */


/* editMercados() ------------------------------------------------------- *\
*
*   ~ Editar nombre de mercado --> cambia en productos (mercados.id)
*
* ----------------------------------------------------------------------- */

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

/*
editMercados(2,"Lidl").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* editPrioridad() ------------------------------------------------------- *\
*
*   ~ Editar nombre prioridad --> cambia en productos (prioridad.id)
*
* ------------------------------------------------------------------------ */

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

/*
editPrioridad(2,"ok").then( x => console.log(x)).catch( x => console.log(x));
*/




/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* editTipos() --------------------------------------------------- *\
*
*   ~ Editar nombre de tipo --> cambia en productos (tipos.id)
*
* ---------------------------------------------------------------- */

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