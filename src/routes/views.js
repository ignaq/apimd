import { Router } from 'express';
import { Product } from '../models/product.js';
import { cartModel } from '../models/carts.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {})
})
router.get('/products', async (req, res) => {

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
      lean: true,
    });

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';

  
    result.isValid = !(page <= 0 || page > result.totalPages)


    res.render('products', result)


})

router.get('/cart/:cid', async (req, res) => {

      let cid = req.params.cid
      let cartProduct = await cartModel.findById({ _id: cid}).populate("products").lean();
      console.log(cartProduct.products)
      res.render('cart', {products: cartProduct.products})
})

export default router;