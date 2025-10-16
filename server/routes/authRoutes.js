import express from 'express'
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const generateToken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'})
}

router.post('/register', async (req, res) =>{

    try {
        const {name, email, password } = req.body 

        if(!name || !email || !password){
            return res.status(400).json({message: 'Please provide all the details.'})
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: "Email already in Exist" });

        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long.'})
        }

        const profileImg = `https://api.dicebear.com/9.x/adventurer/svg?seed=${email}`

        const newUser = new User({
            name,
            email,
            password,
            profileImg
        })

        await newUser.save()

        const token = generateToken(newUser._id)

        res.status(201).json({
            token,
            newUser:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                profileImg: newUser.profileImg
            },
        })

    } catch (error) {
        console.log('Error in user registration:', error)
        res.status(500).json({message: 'Internal server error'})
    }

    
})

router.post('/login', async (req, res) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: 'Please provide all the details.'})
        }

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'})
        } 

        // compare password
        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect){
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const token = generateToken(user._id)

        res.status(201).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImg: user.profileImg
            },
        })

    } catch (error) {
        console.log('Error in user registration:', error)
        res.status(500).json({message: 'Internal server error'})
    }
})


export default router