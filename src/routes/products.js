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


router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await productManager.getBydId(productId)

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }

    } catch (error) {
        console.log(error);
    }
})


// !! chequear status 


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

router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No se está enviando el producto a actualizar' });
        }

        const update = await productManager.update(id, req.body);
        if (update) {
            res.json(update);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
});



export default router;