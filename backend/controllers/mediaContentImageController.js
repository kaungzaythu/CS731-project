const asyncHandler = require('express-async-handler')

const MediaContent = require('../models/mediaContentModel')
const MediaContentImage = require('../models/mediaContentImageModel')

//@desc     Get Media Content Image
//@route    GET /api/mediaContentsImage
//@access   Private
const getMediaContentsImage = asyncHandler(async (req, res) => {
    const mediaContentsImage = await MediaContentImage.find()
    res.status(200).json(mediaContentsImage)
})

module.exports = {
    getMediaContentsImage
}