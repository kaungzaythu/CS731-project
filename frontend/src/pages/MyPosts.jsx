import React from 'react';
  import { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { useSelector, useDispatch } from 'react-redux'
  import MediaContentItem from '../components/MediaContentItem'
  import Spinner from '../components/Spinner'
  import { getMediaContentByUserID, getCommentUser, reset } from '../features/mediaContents/mediaContentSlice'
  import Grid from '@mui/material/Grid';
  import Box from '@mui/material/Box';
  import LeftSection from '../components/LeftSection'
  import "../style.css";
  import io from 'socket.io-client'; 


  function MyPosts() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { mediaContents, isLoading, isError, message } = useSelector(
      (state) => state.mediaContents
    )

    const [updatedMediaContents, setUpdatedMediaContents] = useState([]);

    useEffect(() => {
      
      if (isError) {
        console.log(message)
      }

      if (!user) {
        navigate('/login')
      }
      else {
        dispatch(getMediaContentByUserID(user?._id))
      }
    
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])


    useEffect(() => {
      const socket = io();
  

      socket.on('changeEvent', (change) => {
        setUpdatedMediaContents((prevContents) => {
          return prevContents.map((content) => {
            if (content._id === change.documentKey._id ) {
              // const updatedContent = { ...content, ...change.updateDescription.updatedFields };
              // const updatedFields = change.updateDescription.updatedFields;
              const updatedFields = change.updateDescription && change.updateDescription.updatedFields;
              const updatedContent = { ...content, ...(updatedFields && change.updateDescription.updatedFields) };
              
              if (updatedFields && Array.isArray(updatedContent.comments)) {
                const updatedComments = [...updatedContent.comments];
      
                for (const key in updatedFields) {
                  var user_id = ''
                  var commentIndex = 0
                  var commentData
                  if (key.startsWith('comments.')) {
                    commentIndex = parseInt(key.split('.')[1]);
                    commentData = updatedFields[key];
                    user_id = commentData.user_id;
                  }
                  
                  if (user_id == '' && updatedFields.comments !== undefined) {
                    // first comment
                    user_id = updatedFields.comments[0].user_id
                    commentData = updatedFields.comments[0]
                  }
                  
                  if (user_id !== '') {
                    // Fetch the user object and add it to the commentData
                    dispatch(getCommentUser(user_id)).then((user) => {
                      updatedComments[commentIndex] = { ...commentData, user: user.payload };
                      // Update the state with the modified comments array
                      setUpdatedMediaContents((prevContents) => {
                        return prevContents.map((content) => {
                          if (content._id === change.documentKey._id) {
                            return { ...content, comments: updatedComments };
                          } else {
                            return content;
                          }
                        });
                      });
                    });
                  }
                  
                }
              }
      
              return updatedContent;
            } else {
              return content;
            }
          });
        });
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      setUpdatedMediaContents(mediaContents);
    }, [mediaContents]);
  

    if (isLoading) {
      return <Spinner />
    }
    return (
      <>
        <Grid container spacing={2} justifyContent="center">
          {/* First Column */}
          <Grid item xs={3} height="100vh" style={{ position: 'sticky', top: 0 }}>
            <LeftSection/>
            {/* <Box pl={5} pt={3}>
              <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 35}} >
                  <span style={{ color: '#7A3385' }}>Friend</span><span style={{ color: '#335985' }}>Loop</span>
                </Typography>
                <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 11}}>
                  <span style={{ color: '#7A3385' }}>Express Yourself, Connect with Others.</span>
                </Typography>
            </Box>

            <Box pl={5} pt={10}>
              <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 25}} >
                  <span style={{ color: '#335985' }}>Welcome</span>
                </Typography>
                <Typography sx={{fontFamily:'lato', fontSize: 20, fontWeight: 'bold'}}>
                  <span >{user && user.first_name + " " + user.last_name}</span>
                </Typography>
            </Box>

            <Box pl={5} position="absolute" bottom="50px">
              <GradientButton  onClick={onLogout} text="LOGOUT" />
            </Box> */}
          </Grid>
          {/* Second Column */}
          <Grid item xs={6}>
            <Box pt={4}></Box>
            <section>
              {updatedMediaContents.length > 0 ? (
                <div>
                  {updatedMediaContents
                  .slice() // Sort put the lastest on the top
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                  .map((mediaContent) => (
                    <React.Fragment key={mediaContent._id}>
                      
                    <MediaContentItem  mediaContent={mediaContent} redirect="/my-posts"/>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <h3>You have not created any media contents.</h3>
              )}
            </section>
            </Grid>
            {/* Third Column */}
          <Grid item xs={3} height="100vh" style={{ position: 'sticky', top: 0 }}></Grid>
        </Grid>
      
        
      </>
    )
  }

  export default MyPosts