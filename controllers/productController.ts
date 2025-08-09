// controllers/productController.ts
import Product from '../models/products';
import { Request, Response } from 'express';

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file?.filename;

        const newProduct = new Product({ name, price, description, image });
        await newProduct.save();

        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
};
// controllers/productController.ts
export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.render('index', { products }); // إرسال المنتجات للقالب
};
