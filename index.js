import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import { 
    productos,addProducto,delProducto,updateProducto,
    productosInfo,listaCompra,
    updateEstado,updatePrecio,updatePrecioKg,updateMercado,updateCantidad,updateMax,updateUnits,updatePrioridad,updateTipo,updateFrecuencia,
    mercados,addMercado,delMercado,editMercados,
    prioridad,addPrioridad,delPrioridad,editPrioridad,
    tipos,addTipo,delTipo,editTipos,
} from "./db.js";

dotevn.config();
const server = express();


server.use(cors());

server.use(express.json());





/* ---------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* GET ---------------------------------------------------------------------------------------------------------- *\
*
*   - GET productos() -----------------> switch for productosFrecuencia() | --
*       · GET productosInfo() ---------> /productos/info                  | ok
*       · POST listaCompra() ----------> /productos/compra                | ok
*       · POST productosFrecuencia() --> move to /productos               | --
*   - GET mercados() ------------------> /mercados                        | ok
*   - GET prioridad() -----------------> /prioridad                       | ok
*   - GET tipos() ---------------------> /tipos                           | ok
*
* --------------------------------------------------------------------------------------------------------------- */


/* PRODUCTOS ---------------------------------------------------------------------------------------- */

/*
server.get("/productos", async (req,res) => {
    try{
        let listaProductos = await productos();

        res.json(listaProductos);

    }catch(error){
        res.status(500);
        res.send({ error : "productos req error" });
    }
});
*/



server.post("/productos/", async (req,res) => {
    try{
        let listaFrecuencia = await productos(req.body.frecuencia);

        res.json(listaFrecuencia)

    }catch(error){
        console.log(error)
        res.status(500);
        res.send({ error : "productos frecuencia req error" });
    }
});



server.get("/productos/info", async (req,res) => {
    try{
        let listaProductosInfo = await productosInfo();

        res.json(listaProductosInfo);

    }catch(error){
        res.status(500);
        res.send({ error : "productos info req error" });
    }
});



server.post("/productos/compra", async (req,res) => {
    try{
        let listaProductosCompra = await listaCompra(req.body.filtromercado);

        res.json(listaProductosCompra);

    }catch(error){
        res.status(500);
        res.send({ error : "lista compra req error" });
    }
});





/* MERCADOS, PRIORIDAD, TIPOS ------------------------------------------------------------------------------------------------*/

server.get("/mercados", async (req,res) => {
    try{
        let listaMercados = await mercados();

        res.json(listaMercados);

    }catch(error){
        res.status(500);
        res.send({ error : "mercados req error" });
    }
});



server.get("/prioridad", async (req,res) => {
    try{
        let listaPrioridad = await prioridad();

        res.json(listaPrioridad);

    }catch(error){
        res.status(500);
        res.send({ error : "prioridad req error" });
    }
});



server.get("/tipos", async (req,res) => {
    try{
        let listaTipos = await tipos();
        
        res.json(listaTipos);

    }catch(error){
        res.status(500);
        res.send({ error : "tipos req error" });
    }
})





/* ------------------------------------------------------------------------------------------------------------------------ */


/* POST -------------------------------------------------------------- *\
*
*   - POST addProductos() ----------> /productos/nuevo | ok
*   - POST addMercados() -----------> /mercados/nuevo  | ok
*   - POST addPrioridad() ----------> /prioridad/nueva | ok
*   - POST addTipos() --------------> /tipos/nuevo     | ok
*
* -------------------------------------------------------------------- */


/* PRODUCTO NUEVO ------------------------------------------------------------------------------------------- *\
*
*   ~ Props del front vacías --> valor null en req.body --> addProducto() filtra los campos vacíos
*
* ----------------------------------------------------------------------------------------------------------- */

server.post("/productos/nuevo", async (req,res,next) => {
    try{
        let nuevoProducto = await addProducto(  req.body.producto,
                                                req.body.estado,
                                                req.body.precio,
                                                req.body.mercado,
                                                req.body.preciokg,
                                                req.body.cantidad,
                                                req.body.cantidadud,
                                                req.body.units,
                                                req.body.max,
                                                req.body.prioridad,
                                                req.body.tipo,
                                                req.body.frecuencia
                                            );

        res.json(nuevoProducto);

    }catch(error){
        res.status(500);
        res.send({ error : "add producto req error" });
    }
});





/* ------------------------------------------------------------------------------------------------------------------------ */


/* MERCADOS,PRIORIDAD,TIPOS NUEVO */

server.post("/mercados/nuevo", async (req,res) => {
    try{
        let nuevoMercado = await addMercado(req.body.mercado);

        res.json(nuevoMercado);
        
    }catch(error){
        res.status(500);
        res.send({ error : "add mercado req error" });
    }
});



server.post("/prioridad/nueva", async (req,res) => {
    try{
        let nuevaPrioridad = await addPrioridad(req.body.prioridad);

        res.json(nuevaPrioridad);

    }catch(error){
        res.status(500);
        res.send({ error : "add prioridad req error" });
    }
});



server.post("/tipos/nuevo", async (req,res) => {
    try{
        let nuevoTipo = await addTipo(req.body.tipo);

        res.json(nuevoTipo);

    }catch(error){
        res.status(500);
        res.send({ error : "add tipo req error" });
    }
});





/* ------------------------------------------------------------------------------------------------------------------------ */


/* DELETE ----------------------------------------------------------- *\
*
*   - DELETE deleteProductos() --> /productos/borrar | ok
*   - DELETE deleteMercados() ---> /mercados/borrar  | ok
*   - DELETE deletePrioridad() --> /prioridad/borrar | ok
*   - DELETE deleteTipos() ------> /tipos/borrar     | ok
*
* ------------------------------------------------------------------- */


server.delete("/productos/borrar", async (req,res) => {
    try{
        let borrarProducto = await delProducto(req.body.id)

        res.json(borrarProducto)

    }catch(error){
        res.status(500);
        res.send({ error : "del producto req error" });
    }
});



server.delete("/mercados/borrar", async (req,res) => {
    try{
        let borrarMercado = await delMercado(req.body.id);

        res.json(borrarMercado);

    }catch(error){
        res.status(500);
        res.send({ error : "del mercado req error" });
    }
});



server.delete("/prioridad/borrar", async (req,res) => {
    try{
        let borrarPrioridad = await delPrioridad(req.body.id);
        

        res.json(borrarPrioridad);
        
    }catch(error){
        res.status(500);
        console.log(error);
        res.send({ error : "del prioridad req error" });
    }
});



server.delete("/tipos/borrar", async (req,res) => {
    try{
        let borrarTipo = await delTipo(req.body.id);

        res.json(borrarTipo);

    }catch(error){
        console.log(error)
        res.status(500);
        res.send({ error : "del tipo req error" });
    }
});





/* ------------------------------------------------------------------------------------------------------------------------ */


/* PUT --------------------------------------------------------------------- *\
*
*   - PUT updateproductos() --> /productos/editar/producto   | ok
*   - PUT updateEstado() -----> /productos/editar/estado     | ok
*   - PUT updatePrecio() -----> /productos/editar/precio     | ok
*   - PUT updatePrecioKg() ---> /productos/editar/preciokg   | ok
*   - PUT updateMercado() ----> /productos/editar/mercado    | ok
*   - PUT updateCantidad() ---> /productos/editar/cantidad   | ok
*   - PUT updateMax() --------> /productos/editar/max        | ok
*   - PUT updateUnits() ------> /productos/editar/units      | ok
*   - PUT updatePrioridad() --> /productos/editar/prioridad  | ok
*   - PUT updateTipo() -------> /productos/editar/tipo       | ok
*   - PUT updateFrecuencia() -> /productos/editar/frecuencia | ok
*
*   - PUT editMercados() -----> /mercados/editar             | ok
*   - PUT editPrioridad() ----> /prioridad/editar            | ok
*   - PUT editTipos() --------> /prioridad/editar            | ok
*
* ---------------------------------------------------------------------------- */


/* EDITAR PRODUCTOS --------------------------------------------------------------------------------------------- */

server.put("/productos/editar/producto", async (req,res) => {
    try{
        let actProducto = await updateProducto(req.body.id,req.body.producto);

        res.json(actProducto);

    }catch(error){
        res.status(500);
        res.send({ error : "update producto req error" });
    }
});



server.put("/productos/editar/estado", async (req,res) => {
    try{
        let actEstado = await updateEstado(req.body.id,req.body.estado);

        res.json(actEstado);

    }catch(error){
        res.status(500);
        res.send({ error : "update estado req error" });
    }
});



server.put("/productos/editar/precio", async (req,res) => {
    try{
        let actPrecio = await updatePrecio(req.body.id,req.body.precio);

        res.json(actPrecio);

    }catch(error){
        res.status(500);
        res.send({ error : "update precio req error" });
    }
});



server.put("/productos/editar/preciokg", async (req,res) => {
    try{
        let actPrecioKg = await updatePrecioKg(req.body.id,req.body.preciokg);

        res.json(actPrecioKg);

    }catch(error){
        res.status(500);
        res.send({ error : "update precio kg req error" });
    }
});



server.put("/productos/editar/mercado", async (req,res) => {
    try{
        let actMercado = await updateMercado(req.body.id,req.body.mercado);

        res.json(actMercado);

    }catch(error){
        res.status(500);
        res.send({ error : "update mercado req error" });
    }
});



server.put("/productos/editar/cantidad", async (req,res) => {
    try{
        let actCantidad = await updateCantidad(req.body.id,req.body.cantidad,req.body.cantidadud);

        res.json(actCantidad);

    }catch(error){
        res.status(500);
        res.send({ error : "update cantidad req error" });
    }
});



server.put("/productos/editar/max", async (req,res) => {
    try{
        let actMax = await updateMax(req.body.id,req.body.max);

        res.json(actMax);

    }catch(error){
        res.status(500);
        res.send({ error : "update max req error" });
    }
});



server.put("/productos/editar/units", async (req,res) => {
    try{
        let actUnits = await updateUnits(req.body.id,req.body.units);

        res.json(actUnits);

    }catch(error){
        res.status(500);
        res.send({ error : "update units req error" });
    }
});



server.put("/productos/editar/prioridad", async (req,res) => {
    try{
        let actPrioridad = await updatePrioridad(req.body.id,req.body.prioridad);

        res.json(actPrioridad);

    }catch(error){
        res.status(500);
        res.send({ error : "update prioridad req error" });
    }
});



server.put("/productos/editar/tipo", async (req,res) => {
    try{
        let actTipo = updateTipo(req.body.id,req.body.tipo);

        res.json(actTipo);

    }catch(error){
        res.status(500);
        res.send({ error : "update tipo req error" });
    }
});



server.put("/productos/editar/frecuencia", async (req,res) => {
    try{
        let actFrecuencia = await updateFrecuencia(req.body.id,req.body.frecuencia);

        res.json(actFrecuencia);

    }catch(error){
        console.log(error)
        res.status(500);
        res.send({ error : "update frecuencia req error" });
    }
});





/* EDITAR MERCADOS,PRIORIDAD,TIPOS ------------------------------------------------------------------------------------- */

server.put("/mercados/editar", async (req,res) => {
    try{
        let editarMercados = await editMercados(req.body.id,req.body.mercado);

        res.json(editarMercados);

    }catch(error){
        res.status(500)
        res.send({ error : "editar mercados req error" });
    }
});



server.put("/prioridad/editar", async (req,res) => {
    try{
        let editarPrioridad = await editPrioridad(req.body.id,req.body.prioridad);

        res.json(editarPrioridad);
        
    }catch(error){
        res.status(500);
        res.send({ error : "editar prioridad req error" });
    }
});



server.put("/tipos/editar", async (req,res) => {
    try{
        let editarTipos = await editTipos(req.body.id,req.body.tipo);

        res.json(editarTipos);

    }catch(error){
        res.status(500);
        res.send({ error : "editar tipos req error "});
        console.log(error);
    }
});





/* ------------------------------------------------------------------------------------------------------------------------ */





server.listen(4000);