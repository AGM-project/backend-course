const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const user = [] //Simulasi DB

//Register user
router.post('/register', async (req,res) =>{
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    user.push({email,password:hashedPassword})
    res.json({message:'User berhasil didaftarkan!'})
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body
    const users = user.find(u => u.email === email)
    if(!users){
        return res.status(404).json({ error : `User tidak ditemukan`})
    }
    const isPasswordValid = await bcrypt.compare(password,users.password)
    if(!isPasswordValid){
        return res.status(401).json({error : `Password salah`})
    }

    const token = jwt.sign({email:user.email}, 'secretKey', {expiresIn:'1h'})
    res.json({message:'Login berhasil',token})
})

const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(403).json({error : 'Token diperlukan'})

    jwt.verify(token, 'secretKey', (err,decoded) => {
        if(err) return res.status(401).json({error : 'Token tidak valid'})
        req.user = decoded;
        next()
    })
}

router.get('/profile', verifyToken , (req,res) => {
    res.json({message:'Profil user',user:req.user})
})

module.exports = router