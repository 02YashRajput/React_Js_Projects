import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Counter
export interface ICounter extends Document {
  id: string;
  seq: number;
}

// Define the schema for Counter
const counterSchema = new Schema<ICounter>({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

// Create and export the Counter model
export const Counter = mongoose.model<ICounter>('Counter', counterSchema);
