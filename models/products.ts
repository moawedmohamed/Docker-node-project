// models/Product.ts
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String, // اسم الصورة فقط
});

export default mongoose.model('Product', productSchema);
