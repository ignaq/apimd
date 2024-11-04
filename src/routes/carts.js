import { Router } from 'express'
import CartManager from '../services/CartManager.js'
import ProductManager from '../services/ProductManager.js'
import { check } from '../utils/checkProdAndCart.js'
import { cartModel } from '../models/carts.js'

const router = Router()

const cartManager = new CartManager()
const productManager = new ProductManager();


router.get('/', async (req, res) => {

    try {
        const products = await cartModel.find();
        res.json({status: "success", payload: products});
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create({})
        res.status(201).send(cart)
        // const cart = await cartManager.add()
        // res.status(201).json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la creación del carrito' });
    }
})


router.get('/:cid', async (req, res) => {

    if(!req.params.cid){
        res.status(404).json({ error: 'no se envio el id del carrito' })
    }
    // const cartId = parseInt(req.params.cid)
    // const cart = await cartManager.getBydId(cartId)
    try {
        const carts = await cartModel.findOne({_id: req.params.cid})
        res.json({status: "success", payload: carts});
    } catch (error) {
        console.log(error)
    }
    
    if (carts) {
        res.status(200).json(carts)
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' })
    }
})


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)

        const cart = await cartManager.getBydId(cartId)
        const product = await productManager.getBydId(productId)

        if(cart && product){
            const result = await cartManager.addProduct(cart, product);
            if (result) {
            res.json(result);
            } else {
                res.status(404).json({ error: 'No se puede agregar un producto en el carrito' });
            }
        }else{  
            const errors = check({ cart, product});
            return res.status(400).json({ errors });
        }

    } catch (error) {
        console.log(error)
    }
})

export default router;