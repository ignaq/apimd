import { Router } from 'express'
import CartManager from '../services/CartManager.js'


const router = Router()

const cartManager = new CartManager()

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.add()
        res.status(201).json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la creación del carrito' });
    }
})

export default router;