import { Router } from 'express'
import ProductManager from '../services/ProductManager.js';


const router = Router()

const productManager = new ProductManager()


router.get('/', async (req, res) => {

    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getAll(limit);
        res.json(products);
    } catch (error) {
        console.log(error)
    }
})


export default router;