const mongoose = require('mongoose')

// to add according to MediaContentTable from google docs
const mediaContentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    content_description: {
        type: String,
        required: [true, 'Please add the content description']
    },
    vote_count: {
        type: String,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MediaContentImage',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('MediaContentTable', mediaContentSchema)