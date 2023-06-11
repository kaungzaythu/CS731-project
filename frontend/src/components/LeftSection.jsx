import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, authReset} from '../features/auth/authSlice'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogOffIcon from '@mui/icons-material/PowerSettingsNew';
import CreateAPost from '@mui/icons-material/NoteAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

function LeftSection() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
    }

    const onCreateAPost = () => {
      navigate('/post-media')
    }

    const onSetting = () => {
      navigate('/setting')
    }

    const onMyProfile = () => {
      navigate('/my-posts')
    }

    const onHome = () => {
      navigate('/')
    }

    return (
        <>
        
        <Box pl={5} pt={3}>
          
        <Typography to="/"  component={Link} sx={{fontFamily:'Libre Caslon Text', fontSize: 35, textDecoration: "none",}} >
            <span style={{ color: '#7A3385' }}>Friend</span><span style={{ color: '#335985' }}>Loop</span>
          </Typography>
          <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 11}}>
            <span style={{ color: '#7A3385' }}>Express Yourself, Connect with Others.</span>
          </Typography>
      </Box>
      <Box pl={7} pt={10}>
        <Typography sx={{fontFamily:'Libre Caslon Text', fontSize: 25}} >
            <span style={{ color: '#335985' }}>Welcome</span>
          </Typography>
          <Typography sx={{fontFamily:'lato', fontSize: 20, fontWeight: 'bold'}}>
            <span >{user && user.first_name + " " + user.last_name}</span>
          </Typography>
      </Box>
      <Box pl={5}  pt={5} >
      <Button
            variant="text"
            onClick={onHome}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A3385', 
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          }}
            
          >
            <HomeIcon style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}} />
           
            <Typography sx={{ fontFamily: 'lato', fontSize: 13, fontWeight: 'bold' }}>
           
            Home
                                
              
            </Typography>
          </Button>
      </Box>
      <Box pl={5}>
      <Button
            variant="text"
            onClick={onCreateAPost}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A3385', 
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          }}
            
          >
            <CreateAPost style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}} />
           
            <Typography sx={{ fontFamily: 'lato', fontSize: 13, fontWeight: 'bold' }}>
           
            Create a Post
                                
              
            </Typography>
          </Button>
      </Box>

      <Box pl={5} >
      <Button
            variant="text"
            onClick={onMyProfile}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A3385', 
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          }}
            
          >
            <AccountCircleIcon style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}} />
           
            <Typography sx={{ fontFamily: 'lato', fontSize: 13, fontWeight: 'bold' }}>
           
            My Posts
                                
              
            </Typography>
          </Button>
      </Box>

      {/* <Box pl={5} >
      <Button
            variant="text"
            onClick={onSetting}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A3385', 
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          }}
            
          >
            <SettingsIcon style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%', padding: '7'}} />
           
            <Typography sx={{ fontFamily: 'lato', fontSize: 13, fontWeight: 'bold' }}>
           
            Setting
                                
              
            </Typography>
          </Button>
      </Box> */}

        <Box pl={5} position="absolute" bottom="50px">
          <Button
            variant="text"
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A3385', 
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          }}
            
          >
            <LogOffIcon style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',  borderRadius: '50%',padding: '7'}} />

            <Typography sx={{ fontFamily: 'lato', fontSize: 13, fontWeight: 'bold' }}>
              Log out
            </Typography>
          </Button>
        </Box>
        </>
        
      )
            }

export default LeftSection