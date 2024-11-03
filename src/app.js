import express from 'express'
import handlebars  from 'express-handlebars';
import __dirnameView from './utils/dir-util.js'
import cors from 'cors'
import mongoose from 'mongoose'

import products from './routes/products.js'
import carts from './routes/carts.js'
import routerView from './routes/views.js'

import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

const server = createServer(app); 

const io = new Server(server);
//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirnameView);
app.set('view engine', 'handlebars');



  // Rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(express.static(__dirnameView + "/public"))
app.use("/api/products", products)
app.use("/api/carts", carts)

app.use('/', routerView)

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})


const pathdb = 'mongodb+srv://jignacioquintero:ZQUsKR3VWYR8HTNF@cluster0.3x9ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectMongo = async () => {
  try {
    await mongoose.connect(pathdb);
    console.log('Conectado a mongoose');
  } catch (error) {
    console.log(error)
  }
}
connectMongo()