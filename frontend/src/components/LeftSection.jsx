import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, authReset} from '../features/auth/authSlice'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GradientButton from '../components/GradientButton'

function LeftSection() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
    }

    return (
        <>
        <Box pl={5} pt={3}>
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
      </Box>
        </>
        
      )
            }

export default LeftSection