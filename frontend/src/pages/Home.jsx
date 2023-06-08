import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MediaContentItem from '../components/MediaContentItem'
import Spinner from '../components/Spinner'
import { getMediaContents, reset } from '../features/mediaContents/mediaContentSlice'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LeftSection from '../components/LeftSection'
import "../style.css";


function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { mediaContents, isLoading, isError, message } = useSelector(
    (state) => state.mediaContents
  )

  // const onLogout = () => {
  //     dispatch(logout())
  //     dispatch(authReset())
  //     navigate('/')
  // }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    else {
      dispatch(getMediaContents())
    }
   
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

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
            {mediaContents.length > 0 ? (
              <div>
                {mediaContents
                .slice() // Sort put the lastest on the top
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                .map((mediaContent) => (
                  <MediaContentItem key={mediaContent._id} mediaContent={mediaContent} />
                ))}
              </div>
            ) : (
              <h3>You have not created any media contents</h3>
            )}
          </section>
          </Grid>
          {/* Third Column */}
        <Grid item xs={3} height="100vh" style={{ position: 'sticky', top: 0 }}>right</Grid>
      </Grid>
    
      
    </>
  )
}

export default Home