import {Request, Response} from 'express'
import prisma from '../utils/prismaClient'

const SECRET_KEY = process.env.SECRET_KEY || '@patria2025'

const getAllCartItems = async (req: Request, res: Response) => {
    try {
        const cartItems = await prisma.cartItems.findMany({
            include: {
                Products: true
            }
        })
        res.json(cartItems)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' })
    }
}

const getCartItemById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cartItem = await prisma.cartItems.findUnique({
            where: {
                CartItemID: Number(id)
            },
            include: {
                Products: true
            }
        })
        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' })
        }
        res.json(cartItem)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart item' })
    }
}

const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { Quantity } = req.body
        const findCartItemID = await prisma.cartItems.findUnique({
            where: {
                CartItemID: Number(id)
            }
        })
        if(!findCartItemID) {
            res.status(404).json({ message: 'Cart item not found' })
        }else{
            const updatedCartItem = await prisma.cartItems.update({
                where: {
                    CartItemID: Number(id)
                },
                data: {
                    Quantity:Number(Quantity)
                },
                include: {
                    Products: true
                }
            })
            if (!updatedCartItem) {
                res.status(404).json({ message: 'Cart item not found' })
            }
            res.json(updatedCartItem)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item' })
    }
}

const addCartItem = async (req: Request, res: Response) => {
    try {
        const { cartId, productId, quantity } = req.body //inisialisasi variabel
        const checkcartId = await prisma.carts.findFirst({ //cek apakah id cart ditemukan
            where: {
                CartID: Number(cartId)
            }
        })
        if(cartId && checkcartId){ // Jika ada id dan id ditemukan
            const checkProductId = await prisma.products.findFirst({ //cek apakah product ditemukan
                where: {
                    ProductID: Number(productId)
                }
            })
            if(productId && checkProductId && quantity > 0){ //cek apakah product ditemukan
                const checkProductIDinCartItem = await prisma.cartItems.findFirst({
                    where: {
                        CartID: Number(cartId),
                        ProductID: Number(productId)
                    }
                })
                if(checkProductIDinCartItem){ //Jika product ditemukan di cart item
                    const updateQuantity = await prisma.cartItems.updateMany({ // update quantity
                        where: {
                            CartID: Number(cartId),
                            ProductID: Number(productId)
                        },
                        data: {
                            Quantity: checkProductIDinCartItem.Quantity + quantity
                        }
                    })
                    res.status(200).json("Product Qty berhasil ditambahkan!")
                }else{
                    const newCartItem = await prisma.cartItems.create({ //create new cart item
                        data: {
                            CartID: Number(cartId),
                            ProductID: Number(productId),
                            Quantity: Number(quantity)
                        }
                    })
                    res.status(201).json(newCartItem)
                }
            }else{
                res.status(404).json({ message: 'Product not found' })
            }
        }else{
            res.status(404).json({ message: 'Cart not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' })
    }
}

const deleteCartItem = async (req: Request, res: Response) => {
    try{
        const idCartItem = req.params.id
        await prisma.cartItems.delete({
            where: {
                CartItemID: Number(idCartItem)
            }
        })
        res.status(200).json("Cart item deleted successfully")
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting cart item' })
    }
}


export default {
    getAllCartItems,
    getCartItemById,
    updateCartItem,
    addCartItem,
    deleteCartItem
}