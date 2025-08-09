import express from 'express';
import upload from '../middleware/upload'; // ملف multer
import Product from '../models/products';

const router = express.Router();

router.post('/add-product', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const image = req.file?.filename;

  if (!image) return res.status(400).send('Image upload failed');

  const product = new Product({ title, price, image });
  await product.save();

  res.send('Product saved');
});

export default router;
