import fs from 'fs/promises';
import path from 'path'


const filePath = path.resolve('data', 'carrito.json')


export default class CartManager{
    constructor(){
        this.carts = [];
        this.init()
    }

    async init(){
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            this.carts = JSON.parse(data)
        } catch (error) {
            console.log('Todavia no se crearon carritos')
            this.carts = []
        }
    }

    saveToFile() {
        fs.writeFile(filePath, JSON.stringify(this.carts, null, 2))
    }

    add() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []  
        };
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

}
