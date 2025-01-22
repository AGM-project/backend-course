const Address = require("../models/Address");
const express = require("express")

const router = express.Router()

//get All record
router.get("/", async(req,res) => {
    try{
        const address = await Address.findAll();
        res.json(address)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//find record by ID
router.get("/:id", async(req,res) => {
    try{
        const address = await Address.findByPk(req.params.id);
        if (!address) {
            return res.status(404).json({message: "Address not found"})
        }
        res.json(address)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//create new record
router.post('/', async(req, res) => {
    try{
        const { CartID,
            AddressLine1,
            AddressLine2,
            City,
            State,
            ZipCode, } = req.body;

        // Buat data produk baru tanpa menyertakan CreatedAt atau UpdatedAt
        const address = await Address.create({
            CartID,
            AddressLine1,
            AddressLine2,
            City,
            State,
            ZipCode,
        });
        res.status(201).json(address);
    }catch(err){
        console.error('Error inserting address', err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

//update record
router.put('/:id', async(req,res) => {
    try{
        const updated = await Address.update(req.body,{where: {AddressID:req.params.id}})
        if(updated[0] === 0){
            return res.status(404).json({message: "Address not found"})
        }
        const updatedAddress = await Address.findByPk(req.params.id)
        res.json(updatedAddress)
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})

//delete record
router.delete('/:id', async(req,res) => {
    try{
        const deleted = await Address.destroy({where: {AddressID:req.params.id}})
        if(!deleted){
            return res.status(404).json({message: "Address not found"})
        }
        res.json({message: "Address deleted"})
    }catch (err){
        res.status(500).json({message:"Internal Server Error", error: err.message})
    }
})


module.exports = router