const Product = require("../models/Product")

//v1
// const productsHandler = async(req,res) => {
//     if(req.method === "GET"){
//         const products = await Product.findAll();
//         res.end(JSON.stringify(products))
//     }
// }

const productsHandler = async(req,res) => {
    const productId = req.url.split('/')[2]; //get ID Product from URL

    try{
        if(req.method === "GET"){
            if(productId){
                const product = await Product.findByPk(productId)
                if (product) {
                    res.end(JSON.stringify(product))
                }
                else{
                    res.statusCode = 404
                    res.end(JSON.stringify({message:'Product not Found'}))
                }
            }else{
                const products = await Product.findAll();
                res.end(JSON.stringify(products))
            }
        }
        else if(req.method === "POST"){
            //POST /products
            let body = "";
            req.on('data', chunk => {
                body += chunk.toString()
            })
            req.on('end', async () => {
                const newProductData = JSON.parse(body)
                //const newProduct = await Product.create(newProductData)

                //create new product, save defined column
                const newProduct = await Product.create(newProductData,{
                    //fields: ["Name","Description","Price","Stock","CreatedAt"], //just save this column
                })
                res.statusCode = 201;
                res.end(JSON.stringify(newProduct))
            })
        }
        else if(req.method === "PUT" && productId){ //method untuk edit
            //PUT /products/{productId}
            let body = ''
            req.on('data',chunk=>{
                body += chunk.toString()
            })
            req.on('end', async () => {
                const updateProductData = JSON.parse(body)
                //const newProduct = await Product.create(updateProductData)

                //create new product, save defined column
                const [updated] = await Product.update(updateProductData,{
                    where: {ProductID:productId}
                    //fields: ["Name","Description","Price","Stock","UpdatedAt"], //just update this column
                })
                if(updated){
                    const updatedProduct = await Product.findByPk(productId)
                    res.end(JSON.stringify(updatedProduct))
                }
                else{
                    res.statusCode = 404;
                    res.end(JSON.stringify({message: "Product not found"}))
                }
            })
        }
        else if(req.method === "DELETE" && productId){
            //DELETE /products/{productId}
            const deleted = await Product.destroy({where:{ ProductID: productId }})
            if(deleted){
                res.end(JSON.stringify({message: 'Product deleted'}))
            }else{
                res.statusCode = 404;
                res.end(JSON.stringify({message: "Product not found"}))
            }
        }else{
            res.statusCode = 400;
            res.end(JSON.stringify({message: "Bad Request"}))
        }
    }
    catch(err){
        res.statusCode = 500
        res.end(JSON.stringify({message:`Internal Server Error`, error: err.message}))
    }
}



module.exports = productsHandler