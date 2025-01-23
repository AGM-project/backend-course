import { log } from 'console'
import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    try{
        console.log(`Server is running on port ${PORT}`)
    }
    catch(error){
        console.error('Error starting server', error)
    }
})