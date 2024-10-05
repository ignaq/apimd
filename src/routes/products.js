import { Router } from 'express'
import ProductManager from '../services/ProductManager.js';
import { check } from '../utils/checkProducts.js';

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



router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category,  thumbnails = [], status = true } = req.body;
        const errors = check({ title, description, code, price, stock, category });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
      
        const product = await productManager.add({ title, description, code, price, stock, category, thumbnails, status })
        res.status(201).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la creación del producto' });
    }
})


export default router;