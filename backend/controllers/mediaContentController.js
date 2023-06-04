const asyncHandler = require('express-async-handler')

const MediaContent = require('../models/mediaContentModel')
const MediaContentImage = require('../models/mediaContentImageModel')
const User = require('../models/userModel')

//@desc     Get Media Content
//@route    GET /api/mediaContents
//@access   Private
const getMediaContents = asyncHandler(async (req, res) => {
    const mediaContents = await MediaContent.find()
    res.status(200).json(mediaContents)
})

//@desc     create Media Content
//@route    POST /api/mediaContents
//@access   Private
const createMediaContent = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    if(!req.body.content_description) {
        res.status(400)
        throw new Error('Please enter the content description')
    }

    const mediaContent = await MediaContent.create({
        text: req.body.text,
        content_description: req.body.content_description,
        user: req.body.user,
        vote_count: req.body.vote_count
    })

    if(req.body.image) {

        const mediaContentImage = await MediaContentImage.create({
            content: mediaContent.id,
            image: req.body.image,
        })
    }


    res.status(200).json(mediaContent)
})
 
//@desc     Update Media Contents
//@route    PUT /api/mediaContents/:id
//@access   Private
const updateMediaContent = asyncHandler(async (req, res) => {
    const mediaContent = await MediaContent.findById(req.params.id)

    if (!mediaContent) {
        res.status(400)
        throw new Error('Content not found')
    }

    // const user = await User.findById(req.user.id)


    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the media content user
    if (mediaContent.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not authorized')
    }

    const updatedMediaContent = await MediaContent.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedMediaContent)
})

//@desc     Delete Media Content
//@route    DELETE /api/mediaContents/:id
//@access   Private
const deleteMediaContent = asyncHandler(async  (req, res) => {

    const mediaContent = await MediaContent.findById(req.params.id)

    if (!mediaContent) {
        res.status(400)
        throw new Error('Media Content not found')
    }
    
    // const user = await User.findById(req.user.id)

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the media content user
    if (mediaContent.user.toString() !== req.user.id) {
        res.status(401) 
        throw new Error('User not authorized')
    }


    // await mediaContent.remove
    const deletedMediaContent = await MediaContent.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getMediaContents, createMediaContent, updateMediaContent, deleteMediaContent
}