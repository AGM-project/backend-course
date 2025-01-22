const CartItems = require("../models/CartItems");
const Product = require("../models/Product");
const Carts = require("../models/Carts");
const express = require("express")

const router = express.Router()

//get All record
router.get('/', async (req, res) => {
    try{
        const cart = await CartItems.findAll({
            include: [
                { model: Product },
                { model: Carts }
            ]
        });
        res.json(cart)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const cart = await CartItems.findAll({
            where: { CartID: req.params.id },
            include: [
                { model: Product },
                // { model: Carts }
            ]
        });
        res.json(cart)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const cartId = parseInt(req.body.CartID);
        const productId = parseInt(req.body.ProductID);
        const quantity = parseInt(req.body.Quantity);

        // Cari cart berdasarkan ID
        const cart = await Carts.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Cari produk berdasarkan ID
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Cek apakah item sudah ada di dalam cart
        const existingItem = await CartItems.findOne({where: {ProductID:productId,CartID:cartId}});
        let test1 ;
        if (existingItem) {
            const qty = existingItem.Quantity + quantity
            test1 = CartItems.update({Quantity:qty},{where:{CartItemID:existingItem.CartItemID}})
        } else {
            const cartID = CartItems.create();
            const newItem = {
                CartID : cartID,
                ProductID: productId,
                CartID: cartId,
                Quantity: quantity,
            };
            test1 = await CartItems.create(newItem);
        }

        res.status(201).json(test1);
    } catch (err) {
        console.error('Error inserting item', err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const deleted = await CartItems.destroy({where: {CartItemID:req.params.id}})
        if(!deleted){
            return res.status(404).json({message: "Cart Item not found"})
        }
        res.json({message: "Cart Item deleted"})
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})


module.exports = router