const mongoose = require('mongoose')

// to add according to MediaContentTable from google docs
const mediaContentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    content_description: {
        type: String,
        required: [true, 'Please add the content description']
    },
    up_vote: [ 
            {
                user_id : 
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                    }, 

                date_time: {
                    type: Date,
                    default: Date.now,
                },
            },
    ],
    down_vote: [
            {
                user_id : 
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                    }, 

                date_time: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    image: {
        type: [],
    },
    comments: [
        {
            user_id : {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            }, 
            comment : {
                type: String,
                required: true,
            },
            date_time: {
                type: Date,
                default: Date.now,
            },
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('MediaContentTable', mediaContentSchema)