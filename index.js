import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import { 
    productosInfo,
    productos,addProducto,addProductoFull,delProducto,updateProducto,
    updateEstado,updatePrecio,updatePrecioKg,updateMercado,updateCantidad,updateCantidadUd,updateMax,updateUnits,updatePrioridad,updateTipo,updateFrecuencia,
    mercados,addMercado,delMercado,editMercados,
    prioridad,addPrioridad,delPrioridad,editPrioridad,
    tipos,addTipo,delTipo,editTipos,
} from "./db.js";

dotevn.config();
const server = express();


server.use(cors());

server.use(express.json());




/* ------------------------------------------------------------------------------------------------------------------------ */

/* GET ----------------------------------------------- *\
*
*   - Get productos ----> productos()        | ok
*   - Get productos info --> productosInfo() | ok
*   - Get mercados -----> mercados()         | ok
*   - Get prioridad ----> prioridad()        | ok
*   - Get tipos --------> tipos()            | ok
*
* ------------------------------------------------------ */

server.get("/productos", async (req,res) => {
    try{
        let listaProductos = await productos();

        res.json(listaProductos);

    }catch(error){
        res.status(500);
        res.send({ error : "productos req error" });
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

/* POST ----------------------------------------------- *\
*
*   - Post productos ----------> addProductos()    | ok
*       · Post producto full --> addProductoFull() | ok
*   - Post mercados -----------> addMercados()     | ok
*   - Post prioridad ----------> addPrioridad()    | ok
*   - Post tipos --------------> addTipos()        | ok
*
* ------------------------------------------------------ */

server.post("/productos/nuevo", async (req,res) => {
    try{
        let nuevoProducto = await addProducto(req.body.producto,
                                                req.body.estado,
                                                req.body.precio,
                                                req.body.preciokg,
                                                req.body.mercado
                                            );

        res.json(nuevoProducto);

    }catch(error){
        res.status(500);
        res.send({ error : "add producto req error" });
    }
});



server.post("/productos/nuevo/full", async (req,res) => {
    try{
        let nuevoProductoFull = await addProductoFull(req.body.producto,
                                                        req.body.estado,
                                                        req.body.precio,
                                                        req.body.preciokg,
                                                        req.body.mercado,
                                                        req.body.cantidad,
                                                        req.body.cantidadud,
                                                        req.body.max,
                                                        req.body.units,
                                                        req.body.prioridad,
                                                        req.body.tipo,
                                                        req.body.frecuencia
                                                    );

        res.json(nuevoProductoFull);
        
    }catch(error){
        res.status(500);
        res.send({ error : "add producto full req error" });
    }
});





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

/* DELETE ----------------------------------------------- *\
*
*   - Delete productos --> deleteProductos() | ok
*   - Delete mercados ---> deleteMercados()  | ok
*   - Delete prioridad --> deletePrioridad() | ok
*   - Delete tipos ------> deleteTipos()     | ok
*
* ------------------------------------------------------ */

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

/* PUT ----------------------------------------------- *\
*
*   - Put productos ----> updateproductos()  | ok
*   - Put estado -------> updateEstado()     | ok
*   - Put precio -------> updatePrecio()     | ok
*   - Put precio kg ----> updatePrecioKg()   | ok
*   - Put mercado ------> updateMercado()    | ok
*   - Put cantidad -----> updateCantidad()   | --
*   - PUt cantidad ud --> updateCantidadUd() | --
*   - Put max ----------> updateMax()        | ok
*   - Put unidades -----> updateUnits()      | --
*   - Put prioridad ----> updatePrioridad()  | ok
*   - Put tipo ---------> updateTipo()       | --
*   - Put frecuencia ---> updateFrecuencia   | --
*
*   - Put mercados -----> editMercados()     | ok
*   - Put prioridad ----> editPrioridad()    | ok
*   - Put tipos --------> editTipos()        | ok
*
* ------------------------------------------------------ */

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
        let actCantidad = await updateCantidad(req.body.id,req.body.cantidad);

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



server.put("/productos/editar/prioridad", async (req,res) => {
    try{
        let actPrioridad = await updatePrioridad(req.body.id,req.body.prioridad);

        res.json(actPrioridad);

    }catch(error){
        res.status(500);
        res.send({ error : "update prioridad req error" });
    }
});





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





server.listen(4000);