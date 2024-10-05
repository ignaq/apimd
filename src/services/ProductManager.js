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

    saveToFile() {
        fs.writeFile(filePath, JSON.stringify(this.products, null, 2))
    }

  
    getAll(limit){
        if(limit){
            return this.products.slice(0, limit)
        }
        return this.products;
    }

    add(product) {
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            name: product.name,  
            price: product.price,
            description: product.description, 
            status: product.status,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
        };
        this.products.push(newProduct);
        this.saveToFile();
        return newProduct;
    }

    getBydId(id){
        return this.products.find(product => product.id === id)
    }

}
