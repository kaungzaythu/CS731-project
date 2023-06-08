const express = require('express')

const router = express.Router()

const { 
    getMediaContents,
    createMediaContent, 
    updateMediaContent, 
    deleteMediaContent,
    updateMediaContentComment,
    updateMediaContentVote,
} = require('../controllers/mediaContentController')

const {protect} = require('../middleware/authMiddleware') 

router.route('/').get(protect, getMediaContents).post(protect, createMediaContent)

router.route('/:id').put(updateMediaContent).delete(protect, deleteMediaContent)

router.route('/updateComment/:id').put(updateMediaContentComment)

router.route('/updateVote/:id').put(updateMediaContentVote)

module.exports = router