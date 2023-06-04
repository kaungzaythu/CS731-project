const mongoose = require("mongoose")

// to add according to MediaContentImageTable from google docs
const mediaContentImageSchema = mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'MediaContent'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MediaContent',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('MediaContentImageTable', mediaContentImageSchema)