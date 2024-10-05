import express from 'express'
import products from './routes/products.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use("/api/products", products)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
