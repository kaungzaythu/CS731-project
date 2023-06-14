// import React, { useState } from 'react';
// import { useEffect } from 'react'
// import { useSelector, useDispatch } from "react-redux"
// import {Link, useNavigate } from 'react-router-dom'
// import {getMediaContents, reset,updateCommentDB, updateComment, deleteMediaContent} from '../features/mediaContents/mediaContentSlice'
// import { Grid, Box, IconButton, Avatar } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import ClearIcon from '@mui/icons-material/Clear';
// import DownvoteIcon from "./DownvoteIcon";
// import UpvoteIcon from "./UpvoteIcon";
// import DownvoteIconNeutral from "./DownvoteIconNeutral"
// import UpvoteIconNeutral from "./UpvoteIconNeutral"
// import { Dialog, Divider, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// function MediaContentItem({mediaContent, redirect}) {

//   const sortedComments = [...mediaContent.comments].sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
//   // mediaContent.comments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

//     const { user } = useSelector((state) => state.auth);
//     const [openCommentForm, setOpenCommentForm] = useState(false);
//     const [newComment, setNewComment] = useState('');
//     const [comments, setComments] = useState(mediaContent.comments); // Track the list of comments

    
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const handleAddComment = async () => {
//     const Comment = {
//         user: user,
//         comment: newComment,
//         mediaContentId: mediaContent._id,
//      }
//      const CommentDB = {
//       user_id: user?._id,
//       comment: newComment,
//       mediaContentId: mediaContent._id,
//    }
     
//      dispatch(updateComment(Comment))//state
//      dispatch(updateCommentDB(CommentDB))
//      setNewComment(''); 
//     };
  

//     const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       const options = {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//       };
//       const formattedDate = date.toLocaleDateString(undefined, options);
//       // console.log(mediaContent._id)
//       return `${formattedDate}`;
//     };

//     const renderImages = () => {
//       const images = mediaContent.image;
    
//       if (!images || images.length === 0) {
//         return null; // No images to render
//       }
    
//       if (images.length === 1) {
//         return (
//           <div style={{ height: '200px' }}>
//             <img src={images[0]}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           </div>
//         );
//       } else if (images.length === 2) {
//         return (
//           <div style={{ height: '200px', display: 'flex' }}>
//             <img src={images[0]}   style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
//             <img src={images[1]}   style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
//           </div>
//         );
//       } else if (images.length === 3) {
//         return (
//           <div style={{ height: '200px', display: 'flex' }}>
//             <img src={images[0]}  style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
//             <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//               <img src={images[1]}  style={{ width: '100%', height: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
//               <img src={images[2]}  style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
//             </div>
//           </div>
//         );
//       }
    
//       return null;
//     };

//     const voteCount = () => {
//       var upvote = mediaContent.up_vote.length
//       var downvote = mediaContent.down_vote.length
//       return upvote - downvote;
//     };

//     const commentCount = () => {
//       const totalSize = mediaContent.comments.length;
//       const comment = totalSize === 0 ? 'COMMENT' : totalSize === 1 ? `COMMENT (${totalSize})` : `COMMENTS (${totalSize})`;
//       return comment;
//     };

//     const downVoteButton = () => {
//       var containsId = mediaContent.down_vote.some(item => item.user_id === user?._id);
//       if (containsId) {
//         return (
//           <DownvoteIcon
//             mediaContentId={mediaContent._id}
//             voterId={user?._id}
//           />
//         )
//       }
//       else {
//         return (
//           <DownvoteIconNeutral
//             mediaContentId={mediaContent._id}
//             voterId={user?._id}
//           />
//         )
//       }
//     }

//     const upVoteButton = () => {
//       var containsId = mediaContent.up_vote.some(item => item.user_id === user?._id);
//       if (containsId) {
//         return (
//           <UpvoteIcon
//             mediaContentId={mediaContent._id}
//             voterId={user?._id}
//           />
//         )
//       }
//       else {
//         return (
//           <UpvoteIconNeutral 
//             mediaContentId={mediaContent._id}
//             voterId={user?._id}
//           />
//         )
//       }
//     }

//     const deletePostButton = () => {
      
//       var containsId = mediaContent.user?._id === user?._id;
//       if (containsId) {
//         return (
//           <IconButton size="big" style={{ color: '#7A3385'}}  onClick={deletePostAction}>
//               <ClearIcon />
//           </IconButton>
//         )
//       }
//     }

//     const deletePostAction = () => {
//       dispatch(deleteMediaContent(mediaContent._id))
//     }

//   return (
//     <>
//     <Grid >

//         <Box 
//           sx={{
//             backgroundColor: '#EBECF9',
//             height: '100%',
//             width: '100%',
//             border: '2px solid rgba(122, 51, 133, 0.3)',
//             boxShadow: '5px 5px 10px 0px rgba(166, 171, 189, 1)',
//             borderRadius: '4px',
//           }}>
          

//           <Box display="flex" flexDirection="column" p={2}>
//             <Box display="flex" alignItems="center" justifyContent="space-between">
//               <Box display="flex" alignItems="center">
//                 <Avatar src={mediaContent.user?.profile_picture} alt="Kvatar" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}/>
//                 <Box ml={2}>
//                   <Typography variant="subtitle1">
//                     {mediaContent.user?.first_name + ' ' + mediaContent.user?.last_name }<span style={{ color: '#808080', fontSize: '15px'}}>{ ' ' + mediaContent.user?.introduction }</span>
//                     </Typography>
//                   <Typography sx={{ fontFamily: 'Lato', fontSize: 12, fontWeight: 'bold', color:'#335985'}}>
//                     {formatDate(mediaContent.createdAt)}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box display="flex" alignItems="left">
                
//                 {/* <IconButton size="big" style={{ color: '#7A3385'}}>
//                   <ClearIcon />
//                 </IconButton> */}
//                 {deletePostButton()}
//               </Box>
//             </Box>
//             <Box mt={2}>
//                     <Typography sx={{ fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>
//                       {mediaContent.content_description}
//                     </Typography>
//                     <br></br>
//                     {renderImages()}
                  
//             </Box>

//             <Box display="flex" alignItems="center" mt={2} >
//                 {upVoteButton()}
//                 <Typography 
//                 sx={{mx:3, fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', color:'#000000', paddingRight:'10px'}}>
//                   {voteCount()}
//                 </Typography>
              
//                 {downVoteButton()}
//                 <Typography
//                   to={{redirect}}
//                   component={Link}
//                   sx={{
//                     fontFamily: 'lato',
//                     fontSize: 13,
//                     marginLeft: 'auto',
//                   }}
//                   onClick={() => setOpenCommentForm(true)}
//                 >
//                   {commentCount()}
//                 </Typography>
           
                
//                 <Dialog open={openCommentForm} onClose={() => setOpenCommentForm(false)}>
             
//                   <DialogContent >
//                   <Box style={{width: '500px'}}>
//                   <Box display="flex" alignItems="center">
                  
//                       <TextField
//                         id="new_comment"
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         placeholder="Write a comment..."
//                         multiline
//                         rows={2}
//                         variant="outlined"
//                         fullWidth
//                       />
//                       <IconButton size="big" style={{ color: '#7A3385'}} 
//                         onClick={handleAddComment}
//                       >
//                         <SendIcon  style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}  />
//                       </IconButton>
                    
//                       {/* <GradientButton type="submit" onClick={handleAddComment}  text="Add Comment" /> */}
//                     </Box>

//                     <List>
                      
//                       {
//                       sortedComments
//                       .map((comment) => (
//                         <Box display="flex" flexDirection="column" p={1}>
//                           <Box display="flex" alignItems="center" justifyContent="space-between">
//                             <Box display="flex" alignItems="center">
//                             <Avatar src={comment.user?.profile_picture} alt="Kvatar" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}/>
//                               <Box ml={2}>
//                                 <Typography variant="subtitle1">
//                                 {comment.user && comment.user?.first_name + ' ' + comment.user?.last_name}
//                                   </Typography>
//                                 <Typography sx={{ fontFamily: 'Lato', fontSize: 10, fontWeight: 'bold', color:'#335985'}}>
//                                   {formatDate(comment.date_time)}
//                                 </Typography>
//                               </Box>
//                             </Box>
                            
//                           </Box>
//                           <Box mt={1}>
//                                   <Typography sx={{ fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>
//                                     {comment.comment}
//                                   </Typography>

//                           </Box>
//                           <br/>
//                           <Divider orientation="horizontal" style={{ width: '100%', height: '1px' }} />
//                           </Box>

//                       ))}
                      
//                     </List>
//                   </Box>
//                   </DialogContent>
              
//                 </Dialog>

//                 </Box>
//             </Box>
//       </Box>
         
         
   
//     </Grid>

//     <div>
//         <div>
//           {/* {new Date(mediaContent.createdAt).toLocaleString('en-US')} */}
//           {/* {mediaContent.image} */}
     
//         </div>
//         <h2>{mediaContent.text}</h2>
        
//       </div></>
//   );
// }

// export default MediaContentItem


import React, { useState } from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {Link, useNavigate } from 'react-router-dom'
import {getMediaContents, reset,updateCommentDB, updateComment, deleteMediaContent} from '../features/mediaContents/mediaContentSlice'
import { Grid, Box, IconButton, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import DownvoteIcon from "./DownvoteIcon";
import UpvoteIcon from "./UpvoteIcon";
import DownvoteIconNeutral from "./DownvoteIconNeutral"
import UpvoteIconNeutral from "./UpvoteIconNeutral"
import { Dialog, Divider, DialogContent, DialogActions, Button, List, ListItem, ListItemText, TextField, DialogTitle, DialogContentText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MediaContentItem({mediaContent, redirect}) {

  const sortedComments = [...mediaContent.comments].sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
  // mediaContent.comments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

    const { user } = useSelector((state) => state.auth);
    // const [openCommentForm, setOpenCommentForm] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(mediaContent.comments); // Track the list of comments

    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddComment = async () => {
    const Comment = {
        user: user,
        comment: newComment,
        mediaContentId: mediaContent._id,
     }
     const CommentDB = {
      user_id: user?._id,
      comment: newComment,
      mediaContentId: mediaContent._id,
   }
     
     dispatch(updateComment(Comment))//state
     dispatch(updateCommentDB(CommentDB))
     setNewComment(''); 
    };
  

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      // console.log(mediaContent._id)
      return `${formattedDate}`;
    };

    const renderImages = () => {
      const images = mediaContent.image;
    
      if (!images || images.length === 0) {
        return null; // No images to render
      }
    
      if (images.length === 1) {
        return (
          <div style={{ height: '200px' }}>
            <img src={images[0]}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      } else if (images.length === 2) {
        return (
          <div style={{ height: '200px', display: 'flex' }}>
            <img src={images[0]}   style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
            <img src={images[1]}   style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      } else if (images.length === 3) {
        return (
          <div style={{ height: '200px', display: 'flex' }}>
            <img src={images[0]}  style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <img src={images[1]}  style={{ width: '100%', height: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
              <img src={images[2]}  style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        );
      }
    
      return null;
    };

    const voteCount = () => {
      var upvote = mediaContent.up_vote.length
      var downvote = mediaContent.down_vote.length
      return upvote - downvote;
    };

    const commentCount = () => {
      const totalSize = mediaContent.comments.length;
      const comment = totalSize === 0 ? 'COMMENT' : totalSize === 1 ? `COMMENT (${totalSize})` : `COMMENTS (${totalSize})`;
      return comment;
    };

    const downVoteButton = () => {
      var containsId = mediaContent.down_vote.some(item => item.user_id === user?._id);
      if (containsId) {
        return (
          <DownvoteIcon
            mediaContentId={mediaContent._id}
            voterId={user?._id}
          />
        )
      }
      else {
        return (
          <DownvoteIconNeutral
            mediaContentId={mediaContent._id}
            voterId={user?._id}
          />
        )
      }
    }

    const upVoteButton = () => {
      var containsId = mediaContent.up_vote.some(item => item.user_id === user?._id);
      if (containsId) {
        return (
          <UpvoteIcon
            mediaContentId={mediaContent._id}
            voterId={user?._id}
          />
        )
      }
      else {
        return (
          <UpvoteIconNeutral 
            mediaContentId={mediaContent._id}
            voterId={user?._id}
          />
        )
      }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () =>  {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }


    const deletePostButton = () => {
      
      var containsId = mediaContent.user?._id === user?._id;
      if (containsId) {
        return (
          <>
          <IconButton size="big" style={{ color: '#7A3385'}}  onClick={handleClickOpen}>
              <ClearIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
              {"Delete Post"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure want to delete this post ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="success">Cancel</Button>
              <Button onClick={deletePostAction} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          </>
        )
      }
    }

    const deletePostAction = () => {
      dispatch(deleteMediaContent(mediaContent._id))
    }

  return (
    <>
    <Grid >

        <Box 
          sx={{
            backgroundColor: '#EBECF9',
            height: '100%',
            width: '100%',
            border: '2px solid rgba(122, 51, 133, 0.3)',
            boxShadow: '5px 5px 10px 0px rgba(166, 171, 189, 1)',
            borderRadius: '4px',
          }}>
          

          <Box display="flex" flexDirection="column" p={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Avatar src={mediaContent.user?.profile_picture} alt="Kvatar" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}/>
                <Box ml={2}>
                  <Typography variant="subtitle1">
                    {mediaContent.user?.first_name + ' ' + mediaContent.user?.last_name }<span style={{ color: '#808080', fontSize: '15px'}}>{ ' ' + mediaContent.user?.introduction }</span>
                    </Typography>
                  <Typography sx={{ fontFamily: 'Lato', fontSize: 12, fontWeight: 'bold', color:'#335985'}}>
                    {formatDate(mediaContent.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="left">
                
                {/* <IconButton size="big" style={{ color: '#7A3385'}}>
                  <ClearIcon />
                </IconButton> */}
                {deletePostButton()}
              </Box>
            </Box>
            <Box mt={2}>
                    <Typography sx={{ fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>
                      {mediaContent.content_description}
                    </Typography>
                    <br></br>
                    {renderImages()}
                  
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center" mt={2} >
                {upVoteButton()}
                <Typography 
                sx={{mx:3, fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', color:'#000000', paddingRight:'10px'}}>
                  {voteCount()}
                </Typography>
              
                {downVoteButton()}
                <Typography
                  to={{redirect}}
                  component={Link}
                  sx={{
                    fontFamily: 'lato',
                    fontSize: 13,
                    marginLeft: 'auto',
                  }}
                  // onClick={() => setOpenCommentForm(true)}
                  onClick={() => setShowComments(!showComments)}

                >
                  {commentCount()}
                </Typography>
          
              </Box>
                </Grid>

                <Grid item xs={12}>
                {showComments && (
                  <div>
                  <Box>
                  <Box display="flex" alignItems="center">
                  
                      <TextField
                     
                        id="new_comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                        sx={{
                          backgroundColor: 'white'
                        }}
                      />
                      <IconButton size="big" style={{ color: '#7A3385'}} 
                        onClick={handleAddComment}
                      >
                        <SendIcon  style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}  />
                      </IconButton>
                    
                      {/* <GradientButton type="submit" onClick={handleAddComment}  text="Add Comment" /> */}
                    </Box>

                    <List>
                      
                      {
                      sortedComments
                      .map((comment) => (
                        <Box display="flex" flexDirection="column" p={1}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                            <Avatar src={comment.user?.profile_picture} alt="Kvatar" style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}}/>
                              <Box ml={2}>
                                <Typography variant="subtitle1">
                                {comment.user && comment.user?.first_name + ' ' + comment.user?.last_name}
                                  </Typography>
                                <Typography sx={{ fontFamily: 'Lato', fontSize: 10, fontWeight: 'bold', color:'#335985'}}>
                                  {formatDate(comment.date_time)}
                                </Typography>
                              </Box>
                            </Box>
                            
                          </Box>
                          <Box mt={1}>
                                  <Typography sx={{ fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>
                                    {comment.comment}
                                  </Typography>

                          </Box>
                          <br/>
                          <Divider orientation="horizontal" style={{ width: '100%', height: '1px' }} />
                          </Box>

                      ))}
                      
                    </List>
                  </Box>
                </div>
                )}
                </Grid>
            </Grid>

            


               
                </Box>
            {/* </Box> */}
      </Box>
         
         
   
    </Grid>

    <div>
        <div>
          {/* {new Date(mediaContent.createdAt).toLocaleString('en-US')} */}
          {/* {mediaContent.image} */}
     
        </div>
        <h2>{mediaContent.text}</h2>
        
      </div></>
  );
}

export default MediaContentItem
