import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
          }
        ],
        required: true
        // validate: [arrayLimit, '{PATH} debe contener al menos un producto']
      }
})

function arrayLimit(val) {
    return val.length > 0;
}

export const cartModel = mongoose.model(cartCollection, cartSchema);