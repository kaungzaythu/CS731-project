const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler( async (req, res) => {
    
    const {first_name, last_name, introduction, email, phone_number, profile_picture, password} = req.body
    // console.log(`profile_picture => ${profile_picture}`)
    if (!first_name || !last_name || !email || !password) {
        res.status(400)
        throw new Error('Please include all the mandatory fields.')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400) 
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        first_name,
        last_name,
        introduction, 
        email,
        phone_number,
        profile_picture,
        password: hashPassword
        
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            introduction: user.introduction,
            email: user.email,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            introduction: user.introduction,
            email: user.email,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc     Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler( async (req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id)

    // res.status(200).json({
    //     id: _id,
    //     name,
    //     email,
    // })
    res.status(200).json(req.user)
})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, loginUser, getMe,
}