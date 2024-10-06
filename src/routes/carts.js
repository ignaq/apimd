import { Router } from 'express'
import CartManager from '../services/CartManager.js'
import ProductManager from '../services/ProductManager.js'
import { check } from '../utils/checkProdAndCart.js'

const router = Router()

const cartManager = new CartManager()
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.add()
        res.status(201).json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la creación del carrito' });
    }
})


router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getBydId(cartId)

        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' })
        }

    } catch (error) {
        console.log(error);
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