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
}, {
    timestamps: true
})

module.exports = mongoose.model('MediaContentTable', mediaContentSchema)