import { Router } from 'express'
import ProductManager from '../services/ProductManager.js';

const router = Router()

const manager = new ProductManager()
router.get('/', async (req, res) => {
    try {
      const products = await manager.getAll();  
      res.render('home', { products });  
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
});
  

router.get('/realtimeproducts', async (req, res) => {
    try {
    const products = await manager.getAll(); 
    res.render('realTimeProducts', { products }); 
    } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
    }

});

export default router;