import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prismaClient'

const SECRET_KEY = process.env.SECRET_KEY || '@patria2025'

const registerUser = async (req: Request, res: Response) => {
    try {
        const {Email, Password } = req.body
        const hashedPassword = await bcrypt.hash(Password, 10)
        const user = await prisma.users.create({
            data: {
                Email:Email,
                Password: hashedPassword,
            },
        })
        res.status(201).json({ message: 'User registered successfully', user })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body

        const user = await prisma.users.findFirst({ where: { Email:Email} })
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }
        const isValidPassword = bcrypt.compare(Password, user?.Password || '')
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid credential' })
        }
        const token = jwt.sign({ userId: user?.UserID }, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ message: 'User logged in successfully', token })
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const { Name } = req.body
        const userId = parseInt(req.params.id)
        const user = await prisma.users.findFirst({ where: { UserID: userId } })
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }
        await prisma.users.update({
            where: { UserID: userId },
            data: {
                Name: Name,
            },
        })
        res.json({ message: 'User updated successfully' })
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await prisma.users.findFirst({ where: { UserID: userId } })
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }
        await prisma.users.delete({ where: { UserID: userId } })
        res.json({ message: 'User deleted successfully' })
        
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' })
    }
}


export default {
    registerUser,
    loginUser,
    editUser,
    deleteUser
}