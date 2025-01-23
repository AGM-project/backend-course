import {Request, Response} from 'express'
import prisma from '../utils/prismaClient'

const SECRET_KEY = process.env.SECRET_KEY || '@patria2025'

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.products.findMany()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' })
    }
}

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await prisma.products.findFirst({ where: { ProductID: Number(id) } })
        if (!product) {
            res.status(404).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' })
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const { Name, Price, Description, Stock} = req.body
        const newProduct = await prisma.products.create({
            data: { Name, Description, Price, Stock},
        })
        res.json(newProduct)
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' })
    }
}

const editProduct = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const { Name, Price, Description, Stock } = req.body
        const updatedProduct = await prisma.products.update({
            where: { ProductID: Number(id) },
            data: { Name, Price, Description, Stock },
        })
        res.json(updatedProduct)
    } catch (error) {
            res.status(500).json({ message: 'Error updating product' })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.products.delete({ where: { ProductID: Number(id) } })
        res.json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' })
    }
}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}