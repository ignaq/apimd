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
        } catch (e) {
            console.log(e)
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

    addProduct(updateCart, product) {
        const cartIndex = this.carts.findIndex(cart => cart.id === updateCart.id);
        if (cartIndex === -1) return null;
            if(updateCart.products.length === 0){
                this.carts[cartIndex] = { id: this.carts[cartIndex].id, products: [{ id: product.id, quantity: 1 }]};
                this.saveToFile();
                return this.carts[cartIndex];
            }else{
                //busco si existe el producto en el carrito
                const productIndex = updateCart.products.findIndex(prod => prod.id === product.id);
                if(productIndex === -1){
                    this.carts[cartIndex].products.push({ id: product.id, quantity: 1 }) 
                    this.saveToFile();
                    return this.carts[cartIndex]
                }else{
                    this.carts[cartIndex].products[productIndex].quantity += 1;
                    this.saveToFile();
                    return this.carts[cartIndex]
                    // console.log("El producto ya existe. Hay que sumar la cantidad")
                }
               
            }
    }

    getBydId(id){
        return this.carts.find(carts => carts.id === id)
    }

}
