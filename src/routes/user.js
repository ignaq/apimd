import {Router} from 'express';
import { userModel } from '../models/users.js';

const router = Router();

//endpoint
router.get('/', async(req, res) => {
    try {
        const users = await userModel.find()
        res.send({result: 'success', payload: users}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error al obtener los usuarios'})
    }
})

router.post('/', async (req,res) => {
    try {
        const {firsName, lastName, email } = req.body;  
        if(!firsName || !lastName){
            return res.status(400).json({ error : 'Todos los campos son obligatorios'})
        }
        const user = await userModel.create({firsName, lastName, email})
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error al crear usuarios'})
    }
})



//

export default router;
