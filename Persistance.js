const { navajowhite } = require('color-name');
var fs = require('fs');

class Contenedor {
    constructor (archivo){
        this.archivo = archivo;
    }

    async save(producto) {
        let contenido = await this.getAll();
        let id = contenido.length + 1;
        producto.id = id;
        contenido.push(producto);
        try {
            await  fs.promises.writeFile('./' + this.archivo, JSON.stringify(contenido));
            console.log('Guardado');
        
        }catch(err){
            console.log("No se pudo guardar el archivo por el motivo " + JSON.stringify(err));
        }
        return id;
    }

    async getAll () {
        let contenido
        try{
            contenido = await fs.promises.readFile('./' + this.archivo,'utf-8')
        }catch(err){
            console.log('No se pudo leer el contenido del archivo '+err)
        } 
        if(contenido == "") {
            return [];
        }
        return JSON.parse(contenido);

    }
     getAllSync () {
        let contenido
        try{
            contenido =  fs.readFileSync('./' + this.archivo,'utf-8')
        }catch(err){
            console.log('No se pudo leer el contenido del archivo '+err)
        } 
        if(contenido == "") {
            return [];
        }
        return (JSON.parse(contenido));

    }

    async getByIdNumber(id){
        let productos = await this.getAll();
        for (let i = 0; i < productos.length;i++){
            if (productos[i].id == id){
                return productos[i]
            }
        }
        return null;
    }

    async deleteById(id) {
        let productos = await this.getAll();
        for (let i = 0; i < productos.length;i++){
            if (productos[i].id == id){
                productos.splice(i,1);
                try {
                    await  fs.promises.writeFile('./' + this.archivo, JSON.stringify(productos));
                }catch(err) {
                    console.log("No se pudo guardar el archivo por el motivo " + JSON.stringify(err));
                }
            }
        }
  


    }

    async deleteAll() {
        try {
            await  fs.promises.writeFile('./' + this.archivo, "");
        }catch(err) {
            console.log("No se pudo borrar el archivo por el motivo " + JSON.stringify(err));
        }

    }


}


module.exports ={
    contenedor: new Contenedor("productos.txt")
}


