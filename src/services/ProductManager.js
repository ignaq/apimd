import fs from 'fs/promises';
import path from 'path'


const filePath = path.resolve('data', 'productos.json')


export default class ProductManager{
    constructor(){
        this.products = [];
        this.init()
    }

    async init(){
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {
            console.log('Todavia no se crearon productos')
            this.products = []
        }
    }
  
    getAll(limit){
        if(limit){
            return this.products.slice(0, limit)
        }
        return this.products;
    }

}
