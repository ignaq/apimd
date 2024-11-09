import { Router } from 'express'
import CartManager from '../services/CartManager.js'
import ProductManager from '../services/ProductManager.js'
import { check } from '../utils/checkProdAndCart.js'
import { cartModel } from '../models/carts.js'
import { Product } from '../models/product.js'
import mongoose from 'mongoose'
const router = Router()

const cartManager = new CartManager()
const productManager = new ProductManager();


router.get('/', async (req, res) => {

    try {
        const carts = await cartModel.find();
        res.json({status: "success", payload: carts});
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        let cartProduct = await cartModel.find({ _id: req.params.cid }).populate("products.product");
        res.json({status: "success", payload: cartProduct});
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cartExists = await cartModel.findById(cid);
        if (!cartExists) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        let productExistsInCart
        if(cartExists && cartExists.products){
            productExistsInCart = cartExists.products.some(
                productId => productId.toString() === pid
            );
        }
        
        if (!productExistsInCart) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
        }

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: pid } },
            { new: true, useFindAndModify: false }
        ).populate('products');

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const productExists = await Product.findById(pid);
        if (!productExists) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $addToSet: { products: pid } },
            { new: true, useFindAndModify: false }
        ).populate('products');

        if (!updatedCart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito' });
    }
});
//eliminar todos los productos
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cartExists = await cartModel.findById(cid);
        if (!cartExists) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } }, 
            { new: true, useFindAndModify: false }
        ).populate('products');

        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        console.error('Error al eliminar todos los productos del carrito:', error);
        res.status(500).json({ status: 'error', message: 'Error al eliminar todos los productos del carrito' });
    }
});

export default router;