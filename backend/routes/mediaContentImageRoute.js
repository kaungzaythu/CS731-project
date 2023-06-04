const express = require('express')

const router = express.Router()

const { 
    getMediaContentsImage
} = require('../controllers/mediaContentImageController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getMediaContentsImage)

module.exports = router