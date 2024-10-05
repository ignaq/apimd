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


export default router;