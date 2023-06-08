import React, { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid';
import LeftSection from '../components/LeftSection';
import Spinner from '../components/Spinner'
import "../style.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextbox from '../components/CustomTextBox';
import { TextField } from '@mui/material';
import MultipleImageUploader from '../components/MultipleImageUploader';
function PostMedia(){

  const [formData, setFormData] = useState({
    content_description: '',
    profile_picture: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { mediaContents, isLoading, isError, message } = useSelector(
    (state) => state.mediaContents
  )
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    else {
      // dispatch(getMediaContents())
    }
   
    return () => {
      // dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }



  // const [postText, setPostText] = useState('');
  // const [postMedia, setPostMedia] = useState(null);
  // const [comments, setComments] = useState([]);
  // const [commentText, setCommentText] = useState('');




  // const handlePostTextChange = (event) => {
  //   setPostText(event.target.value);
  // };

  // const handlePostMediaChange = (event) => {
  //   const file = event.target.files[0];
  //   setPostMedia(file);
  // };

  // const handleCommentTextChange = (event) => {
  //   setCommentText(event.target.value);
  // };

  // const handlePostSubmit = (event) => {
  //   event.preventDefault();

  //   const newPost = {
  //     id: Date.now(),
  //     text: postText,
  //     media: postMedia,
  //     comments: [],
  //   };

  //   setPostText('');
  //   setPostMedia(null);
  //   setComments([...comments, newPost]);
  // };

  // const handleCommentSubmit = (event, postId) => {
  //   event.preventDefault();

  //   const newComment = {
  //     id: Date.now(),
  //     postId: postId,
  //     text: commentText,
  //   };

  //   const updatedComments = comments.map((post) => {
  //     if (post.id === postId) {
  //       return {
  //         ...post,
  //         comments: [...post.comments, newComment],
  //       };
  //     }
  //     return post;
  //   });

  //   setComments(updatedComments);
  //   setCommentText('');
  // };

  return (
    <form>

 
     <Grid container spacing={2} justifyContent="center">
        {/* First Column */}
        <Grid item xs={3} height="100vh" style={{ position: 'sticky', top: 0 }}>
          <LeftSection/>
        </Grid>

        {/* Second Column */}
        <Grid item xs={6}>
        
          <Box pt={4} pb={4}>
            <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 25, textAlign: 'center'}} >
                  <span style={{ color: '#335985' }}>Post a Media Content</span>
            </Typography>
          </Box>
        <Box 
          sx={{
            backgroundColor: '#EBECF9',
            border: '2px solid rgba(122, 51, 133, 0.3)',
            boxShadow: '5px 5px 10px 0px rgba(166, 171, 189, 1)',
            borderRadius: '4px',
          }}>

            <Box p={5}>
            <TextField
                label="What is on your mind? Say Something"
                multiline
                rows={4}
                fullWidth
                placeholder='What is on your mind? Say Something'
                />
            </Box>
           
           {/* <Box> */}
           <Box pl={5} pr={5} pb={5}>
              
            <MultipleImageUploader
          
                width={100}
                height={100}
                shape="rectangle"
                maxImages={3} 
                onImageUpload={(base64) =>
                                      
                  setFormData((prevState) => ({
                    ...prevState,
                    profile_picture: base64,
                  }))
                }
              />
            </Box>
           {/* </Box> */}


            </Box>

        </Grid>

        {/* Third Column */}
        <Grid item xs={3} height="100vh" style={{ position: 'sticky', top: 0 }}>right</Grid>
        

        
     </Grid>
    </form>
    // <div class="post-media">
    //   <h1>Post Page</h1>

    //   <form onSubmit={handlePostSubmit}>
    //     <textarea
    //       value={postText}
    //       onChange={handlePostTextChange}
    //       placeholder="Write your post..."
    //     />
    //     <input type="file" accept="image/*" onChange={handlePostMediaChange} />
    //     <button type="submit">Post</button>
    //   </form>

    //   <h2>Posts</h2>
    //   {comments.map((post) => (
    //     <div key={post.id}>
    //       <p>{post.text}</p>
    //       {post.media && <img src={URL.createObjectURL(post.media)} alt="Post Media" />}
    //       <form onSubmit={(event) => handleCommentSubmit(event, post.id)}>
    //         <input
    //           type="text"
    //           value={commentText}
    //           onChange={handleCommentTextChange}
    //           placeholder="Add a comment..."
    //         />
    //         <button type="submit">Comment</button>
    //       </form>
    //       <ul>
    //         {post.comments.map((comment) => (
    //           <li key={comment.id}>{comment.text}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>

    
  );
};

export default PostMedia;
