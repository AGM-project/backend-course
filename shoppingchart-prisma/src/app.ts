import express, { Application } from "express"
import bodyParser from 'body-parser'
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import cartRoutes from "./routes/cartRoutes"
import cartItemRoutes from "./routes/cartItemRoutes"

const app:Application = express()

app.use(bodyParser.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/cartitems', cartItemRoutes)

export default app;