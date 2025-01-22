const Product = require("../models/Product");
const express = require("express")
const { Op } = require("sequelize")

const router = express.Router()

//get All record
router.get("/", async(req,res) => {
    try{
        const products = await Product.findAll();
        res.json(products)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//find record by ID
router.get("/:id", async(req,res) => {
    try{
        const products = await Product.findByPk(req.params.id);
        if (!products) {
            return res.status(404).json({message: "Product not found"})
        }
        res.json(products)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//create new record
router.post('/', async(req, res) => {
    try{
        const { Name, Description, Price, Stock } = req.body;

        // Buat data produk baru tanpa menyertakan CreatedAt atau UpdatedAt
        const product = await Product.create({
            Name,
            Description,
            Price,
            Stock
        });
        res.status(201).json(product);
    }catch(err){
        console.error('Error inserting product', err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

//update record
router.put('/:id', async(req,res) => {
    try{
        const updated = await Product.update(req.body,{where: {ProductID:req.params.id}})
        if(updated[0] === 0){
            return res.status(404).json({message: "Product not found"})
        }
        const updatedProduct = await Product.findByPk(req.params.id)
        res.json(updatedProduct)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//delete record
router.delete('/:id', async(req,res) => {
    try{
        const deleted = await Product.destroy({where: {ProductID:req.params.id}})
        if(!deleted){
            return res.status(404).json({message: "Product not found"})
        }
        res.json({message: "Product deleted"})
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})


// Get All Product with Pagination
router.get("/paging", async (req, res) => {
    try {
      const {page = 1, size = 10} = req.query;
      const limit = parseInt(size, 10) || 10; // Jumlah item per halaman
      const offset = (parseInt(page, 10) - 1) || 1 * limit; // Offset berdasarkan halaman
  
      const {count, rows: products} = await Product.findAndCountAll({
        limit,
        offset,
      });
  
      return res.json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
        products,
      });

    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  });

//request by Parameter
router.get('/filter/:price/:minStock', async (req,res) => {
    try{
        const { price, minStock } = req.params
        const products = await Product.findAll({
            where: {
                Price: price,
                Stock: {[Op.gte]: minStock}, // Operator dengan greater than or equal
            }
        })

        if(!products || products.length === 0){
            return res.status(404).json({message: "Product not found"})
        }

        res.json(products)
    }
    catch (err){
        res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
})

//request by Body
router.get('/filter', async (req,res) => {
    try{
        const { price, minStock } = req.body
        if(price === undefined || minStock == undefined) {
            return res.status(400).json({message: "price and minStock are required"})
        }
        const products = await Product.findAll({
            where: {
                Price: price,
                Stock: {[Op.gte]: minStock}, // Operator dengan greater than or equal
            }
        })

        if(!products || products.length === 0){
            return res.status(404).json({message: "Product not found"})
        }

        res.json(products)
    }
    catch (err){
        res.status(500).json({message: 'Internal Server Error', error: err.message})
    }
})


module.exports = router