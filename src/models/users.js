import mongoose from "mongoose";

const userCollection = 'usuarios';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    password: String,
    role: {type: String, enum: ['admin', 'user']},
    created_at: {type: Date, default: Date.now}
})

export const userModel = mongoose.model(userCollection, userSchema);
