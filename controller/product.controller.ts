import { Request, Response } from 'express';
import { Product } from '../model/products.model';

export const CreateProduct = async (req:Request, res:Response) => {
    try {
        const { name, description, price, image } = req.body;

        if(!name || !description || !price || !image) {
            return res.status(400).send({
                message: "Please fill all the fields",
                success: false
            })
        }
        const newProduct = await Product.create({
            name,
            description,
            price,
            image
        })
        res.status(200).send({
            message: "Product created successfully",
            success: true,
            data: newProduct
        })
    } catch (error) {
        
    }
}