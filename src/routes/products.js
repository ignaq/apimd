import { Router } from 'express'
import ProductManager from '../services/ProductManager.js';
import { check } from '../utils/checkProducts.js';
import { productModel } from '../models/product.js';

const router = Router()

// const productManager = new ProductManager()

router.get('/', async (req, res) => {

    try {
        const products = await productModel.find();
        res.json({status: "success", payload: products});
    } catch (error) {
        console.log(error)
    }
})


// router.get('/:pid', async (req, res) => {
//     try {
//         const productId = parseInt(req.params.pid)
//         const product = await productManager.getBydId(productId)

//         if (product) {
//             res.json(product)
//         } else {
//             res.status(404).json({ error: 'Producto no encontrado' })
//         }

//     } catch (error) {
//         console.log(error);
//     }
// })


// !! chequear status 

router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, stock, category,  thumbnails = [], status = true } = req.body;
        const errors = check({ title, description, code, price, stock, category });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const product = await productModel.create({title, description, code, price, stock, category,  thumbnails, status})
        res.status(201).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "Error", error: 'Error al crear el producto'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({status: "Error", error: 'No se está enviando el producto a actualizar' });
        }
        if (!req.params.id) {
            return res.status(400).json({status: "Error", error: 'No se está enviando el id del producto a actualizar' });
        }
        const productUpdate = req.body;

        const update = await productModel.updateOne({_id: req.params.id}, productUpdate);
        res.status(202).send(update)
    } catch (error) {
        console.error(error)
        res.status(500).json({status: "Error", error: "Error al actualizar"})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteProduct = await productModel.deleteOne({_id: req.params.id})
        if (deleteProduct) {
            res.json({status: "success", payload:"Producto eliminado con éxito"});
        } else {
            res.status(404).json({status: "Error",  error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(404).json({status: "Error", error: 'Error al eliminar el producto' });
    }
});


export default router;