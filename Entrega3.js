const express = require ('express');
const importContenedor = require ('./Persistance');

const app = express();
const PORT = 8080
const contenedor = importContenedor.contenedor


const server = app.listen(PORT, () => {
    let producto1= {
        title:"Escuadra",
        price:22,
        thumbnail:"http://imagen.com"
    }
    
    let producto2= {
        title:"cuadernola",
        price:23,
        thumbnail:"http://imagen.com"
    }
    
    let producto3= {
        title:"Lapiz",
        price:24,
        thumbnail:"http://imagen.com"
    }
   console.log(contenedor);
    contenedor.save(producto1).then((result)=> {
    console.log("id "+result)
    contenedor.save(producto2).then((result)=> {
        console.log("id "+result)
        contenedor.save(producto3).then((result)=> {
            console.log("id "+result)
            console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
        });
    });
});
})

app.get('/productos', (req, res) => {

        res.send(contenedor.getAllSync())

 })
 
