import { Router } from 'express'
import { check } from '../utils/checkProducts.js';
import { Product } from '../models/product.js';
import { isValidObjectId } from 'mongoose';

const router = Router()


router.get('/', async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        if (!page) page = 1;
        if (!limit) limit = 10;
      
        const category = req.query.category || null;
        const status = req.query.status || null;
        const sort = req.query.sort;
        
        const query = {}

        if (category) query.category = new RegExp(category, 'i');
        if (status) query.status = status === 'true';

        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const result = await Product.paginate(query, {
            limit,
            page,
            sort: sortOption,
        });

        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : '';

        result.isValid = !(page <= 0 || page > result.totalPages)
    
        res.json({ status: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener los productos" });
    }
});


router.get('/:pid', async (req, res) => {
    try {
        if(!isValidObjectId(req.params.pid)){
            res.status(404).json({ status: "error", message: "id inválido"})
        }
        const product = await Product.findById(req.params.pid)

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ status: "error", message: 'Producto no encontrado' })
        }

    } catch (error) {
        console.log(error);
    }
})
// !! chequear status 

router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, stock, category,  thumbnails = [], status = true } = req.body;
        const errors = check({ title, description, code, price, stock, category });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const product = await Product.create({title, description, code, price, stock, category,  thumbnails, status})
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

        const update = await Product.updateOne({_id: req.params.id}, productUpdate);
        res.status(202).send(update)
    } catch (error) {
        console.error(error)
        res.status(500).json({status: "Error", error: "Error al actualizar"})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.deleteOne({_id: req.params.id})
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