import express from 'express'
import products from './routes/products.js'
import carts from './routes/carts.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use("/api/products", products)
app.use("/api/carts", carts)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
