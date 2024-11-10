import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const userCollection = 'products';

const productSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    description: {type: String, required: true},
    status: {type: Boolean, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: Array}
})

productSchema.plugin(mongoosePaginate)
export const Product = mongoose.model(userCollection, productSchema);