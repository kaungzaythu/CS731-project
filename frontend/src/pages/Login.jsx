import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import GradientButton from '../components/GradientButton'

import Grid from '@mui/material/Grid';
import CustomTextbox from '../components/CustomTextBox';
import Typography from '@mui/material/Typography';
import '@fontsource/libre-caslon-text/700.css';
function Login() {

    const [formData, setFormData] = useState({

        email: '',
        password: ''
    })

    const { email , password} = formData


    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
// execute when the page is loaded
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }))

    }
    const onSubmit = (e) => {
        
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
      <form onSubmit={onSubmit}>
      <Grid container spacing={2} justifyContent="center" >
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'top',
        height: '100vh' }}>
          <Grid container spacing={2} justifyContent="left" alignItems="left">
            <Grid item xs={12}>
              <Typography sx={{fontFamily:'Libre Caslon Text', paddingTop: '150px' }} variant="h2" align="left">
                

               <span style={{ color: '#7A3385' }}>Friend</span><span style={{ color: '#335985' }}>Loop</span>

              </Typography>
              <Typography sx={{fontFamily:'Libre Caslon Text', paddingTop: '25px' }} variant="h6" align="left">
                

                <span style={{ color: '#335985' }}>Express Yourself, Connect with Others.</span>
 
               </Typography>
            </Grid>
           
            
          </Grid>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
        height: '100vh'}}>
        <Grid container spacing={2} justifyContent="flex">
            
            <Grid item xs={12}>
              <Typography sx={{fontFamily:'lato', padding: '10px 10px', color: '#335985'}}variant="h5" align="center">
                Login to account
              </Typography>
              
            </Grid>
            <Grid item xs={12} >
              <CustomTextbox
                type="email"
                id="email"
                name="email"
                value={email}
                label="Email"
                placeholder="Enter your email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextbox
                type="password"
                id="password"
                name="password"
                value={password}
                label="Password"
                placeholder="Enter password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} align="right">
            <GradientButton type="submit" text="LOGIN" />
            </Grid>
            <Grid item xs={12} align="left" sx={{fontFamily:'lato', color: '#335985'}}>
              Don't have an account yet? &nbsp;
             <Link to='/register'>
                  Register here
              </Link>
            </Grid>
            
          </Grid>
         
        </Grid>
      </Grid>
    </form>
    );
}

export default Login