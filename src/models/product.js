import mongoose from "mongoose";

const userCollection = 'products';

const userSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    description: {type: String, required: true},
    status: {type: Boolean, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: Array}
})

export const productModel = mongoose.model(userCollection, userSchema);