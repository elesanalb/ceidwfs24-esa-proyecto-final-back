import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import { productos,mercados,prioridad,addProducto,delProducto,updateProducto } from "./db.js";

dotevn.config();
const server = express();


server.use(cors());

server.use(express.json());




/* GET PRODUCTOS, MERCADOS */

server.get("/productos", async (req,res) => {
    try{
        let listaProductos = await productos();

        res.json(listaProductos);

    }catch(error){
        res.status(500);
        res.send({ error : "productos req error" });
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




/* ADD PRODUCTOS */

server.post("/productos/nuevo", async (req,res) => {
    try{
        let nuevoProducto = await addProducto(req.body.producto,
                                                req.body.mercado,
                                                req.body.precio,
                                                req.body.prioridad,
                                                req.body.max,
                                                req.body.units
                                            );

        res.json(nuevoProducto);
        //console.log(req.body)

    }catch(error){
        res.status(500);
        res.send({ error : "add producto req error" });
    }
});




/* BORRAR PRODUCTOS */

server.delete("/productos/borrar", async (req,res) => {
    try{
        let borrarProducto = await delProducto(req.body.id)

        res.json(borrarProducto)

    }catch(error){
        console.log(error);
        res.status(500);
        res.send({ error : "del producto req error" });
    }
})




/* UPDATE PRODUCTOS */

server.put("/productos/editar", async (req,res) => {
    try{
        let actProducto = await updateProducto(req.body.id,req.body.producto);

        res.json(actProducto);

    }catch(error){
        //console.log(error);
        res.status(500);
        res.send({ error : "update producto req error" });
    }
})



server.listen(4000);