import mongoose, { Schema } from 'mongoose';
// Define the schema for Counter
const counterSchema = new Schema({
    id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});
// Create and export the Counter model
export const Counter = mongoose.model('Counter', counterSchema);
