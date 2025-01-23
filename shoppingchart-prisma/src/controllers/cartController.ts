import {Request, Response} from 'express'
import prisma from '../utils/prismaClient'

const SECRET_KEY = process.env.SECRET_KEY || '@patria2025'

const getAllCarts = async (req: Request, res: Response) => {
    try {
        const carts = await prisma.carts.findMany({
            include: {
                CartItems: {
                    include: {
                        Products: true
                    }
                }
            }
        })
        res.json(carts)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts' })
    }
}

const getCartById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cart = await prisma.carts.findFirst({
            where: { CartID: Number(id) },
            include: {
                CartItems: {
                    include: {
                        Products: true
                    }
                }
            }
        })
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' })
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' })
    }
}

const createCart = async (req: Request, res: Response) => {
    try {
        const cart = await prisma.carts.create({
            data: {}
        })
        res.status(201).json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart' })
    }
}

const deleteCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cart = await prisma.carts.findFirst({ where: { CartID: Number(id) } })
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' })
        }
        await prisma.cartItems.deleteMany({ where: { CartID: Number(id) } })
        await prisma.orders.deleteMany({ where: { CartID: Number(id) } })
        await prisma.carts.delete({ where: { CartID: Number(id) } })
        res.status(204).json({message: 'Cart deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart' })
    }
}


export default {
    getAllCarts,
    getCartById,
    createCart,
    deleteCart,
}