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
            console.log(error)
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
            code: product.code,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
        };
        this.products.push(newProduct);
        this.saveToFile();
        return newProduct;
    }

    update(id, updatedValue) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        const updated = {
            ...this.products[productIndex],
            ...updatedValue,
            id: this.products[productIndex].id,
        };
        this.products[productIndex] = updated;
        this.saveToFile();
        return updated;
    }


    getBydId(id){
        return this.products.find(product => product.id === id)
    }

    delete(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;
        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveToFile();

        return deletedProduct[0];
    }

}
