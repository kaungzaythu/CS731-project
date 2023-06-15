const asyncHandler = require('express-async-handler')

const MediaContent = require('../models/mediaContentModel')
const User = require('../models/userModel')

//@desc     Get Media Content By User ID
//@route    Get /api/mediaContents/:id
//@access   Private
const getMediaContentByUserID = asyncHandler(async (req, res) => {
   
    const updatedMediaContents = [];
    const mediaContents = await MediaContent.find();

    const user_id = String(req.params.id);
    console.log('user_id ' + user_id)
    for (const content of mediaContents) {
        console.log('content.user ' + String(content.user))
        if (user_id === String(content.user)) {
            const updatedComments = await Promise.all(
                content.comments.map(async (comment) => {
                  const commentUser = await User.findById(comment.user_id);
                  return {
                    comment: comment.comment,
                    date_time: comment.date_time,
                    user: commentUser,
                  };
                })
              );
    
            const user = await User.findById(content.user);
            const updatedContent = {
                ...content.toObject(),
                user: user,
                comments: updatedComments,
            };
            updatedMediaContents.push(updatedContent);
        }
    }
   
    res.status(200).json(updatedMediaContents);

})


//@desc     Get Media Content
//@route    GET /api/mediaContents
//@access   Private
const getMediaContents = asyncHandler(async (req, res) => {

    const mediaContents = await MediaContent.find();
    const updatedMediaContents = [];

    

    for (const content of mediaContents) {

        const updatedComments = await Promise.all(
            content.comments.map(async (comment) => {
              const commentUser = await User.findById(comment.user_id);
              return {
                comment: comment.comment,
                date_time: comment.date_time,
                user: commentUser,
              };
            })
          );

        const user = await User.findById(content.user);
        const updatedContent = {
            ...content.toObject(),
            user: user,
            comments: updatedComments,
        };
        updatedMediaContents.push(updatedContent);
    }
   
    res.status(200).json(updatedMediaContents);

})

//@desc     create Media Content
//@route    POST /api/mediaContents
//@access   Private
const createMediaContent = asyncHandler(async (req, res) => {

    if(!req.body.content_description) {
        res.status(400)
        throw new Error('Please enter the content description')
    }
 
    const mediaContent = await MediaContent.create({
        content_description: req.body.content_description,
        user: req.body.user,
        up_vote: [],
        down_vote: [],
        image: req.body.image,
        comments: [],
    })

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

    const updatedMediaContent = await MediaContent.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedMediaContent)
       
})

//@desc     Update Media Contents Comment
//@route    PUT /api/mediaContents/updateComment/:id
//@access   Private
const updateMediaContentComment = asyncHandler(async (req, res) => {
    const mediaContent = await MediaContent.findById(req.params.id)

    if (!mediaContent) {
        res.status(400)
        throw new Error('Content not found')
    }

    const filter = {
        _id: req.params.id,
        comments: { $exists: true }
    };
      
    const findMediaContent = await MediaContent.findOne(filter);

    if(findMediaContent) {
        const newComment = {
            comment: req.body.comment,
            user_id: req.body.user_id,
            date_time: new Date()
        };
          
        mediaContent.comments.push(newComment);
        await mediaContent.save();
        res.status(200).json(mediaContent)
    } else {
        const mediaContent = await MediaContent.create({
            _id: req.params.id,
            comments: [{
              comment: req.body.comment,
              user_id: req.body.user_id,
              date_time: new Date()
            }]
            // Add other properties as needed
          });
        res.status(200).json(mediaContent)
    }
       
})

//@desc     Update Media Contents Up Vote
//@route    PUT /api/mediaContents/updateVote/:id
//@access   Private
const updateMediaContentVote = asyncHandler(async (req, res) => {
    const mediaContent = await MediaContent.findById(req.params.id)

    if (!mediaContent) {
        res.status(400)
        throw new Error('Content not found')
    }

    const findMediaContent = await MediaContent.findById(req.params.id);
    const user_id = req.body.user_id;
    const mediaContentId = req.params.id;
    
    if(findMediaContent) {
        const upVotes = findMediaContent.up_vote; 
        const downVotes = findMediaContent.down_vote; 

        let upVoteCount = 0;
        let downVoteCount = 0;
      
        for (const vote of upVotes) {
          if (vote.user_id.toString() === user_id) {
            upVoteCount = 1;
            break; 
          }
        }
        for (const vote of downVotes) {
            if (vote.user_id.toString() === user_id) {
              downVoteCount = 1;
              break; 
            }
          }
        
        if(req.body.vote_action == "up_vote") {

            if(upVoteCount == 1) {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId },
                    { $pull: { up_vote: { user_id: user_id } } },
                    { new: true }
                );
            }else {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId, 'up_vote.user_id': { $ne: user_id } },
                    { $addToSet: { up_vote: { user_id: user_id, date_time: new Date() } } },
                    { new: true }
                );
            }
            if(downVoteCount == 1) {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId },
                    { $pull: { down_vote: { user_id: user_id } } },
                    { new: true }
                );
            }
                
        } else if(req.body.vote_action == "down_vote") {
            if(downVoteCount == 1) {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId },
                    { $pull: { down_vote: { user_id: user_id } } },
                    { new: true }
                );
            } else {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId, 'down_vote.user_id': { $ne: user_id } },
                    { $addToSet: { down_vote: { user_id: user_id, date_time: new Date() } } },
                    { new: true }
                );
            }
            if(upVoteCount == 1) {
                await MediaContent.findOneAndUpdate(
                    { _id: mediaContentId },
                    { $pull: { up_vote: { user_id: user_id } } },
                    { new: true }
                );
            }  
        }
        const updatedMediaContent = await MediaContent.findById(req.params.id);
        res.status(200).json(updatedMediaContent)
    } 
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

//@desc     Fetch Particular Media Content
//@route    GET /api/mediaContents/fetchData/:id
//@access   Private
const fetchMediaContentByID = asyncHandler(async (req, res) => {
    const mediaContent = await MediaContent.findById(req.params.id)

    if (!mediaContent) {
        res.status(400)
        throw new Error('Media Content not found')
    }

    res.status(200).json(mediaContent);
})

module.exports = {
    getMediaContentByUserID, getMediaContents, createMediaContent, updateMediaContent, deleteMediaContent, updateMediaContentComment, updateMediaContentVote,
    fetchMediaContentByID
}