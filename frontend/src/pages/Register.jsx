import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, authReset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import ImageUploader from '../components/ImageUploader';
import Grid from '@mui/material/Grid';
import CustomTextbox from '../components/CustomTextBox';
import Typography from '@mui/material/Typography';
import GradientButton from '../components/GradientButton'

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    introduction: '',
    email: '',
    phone_number: '',
    profile_picture: '',
    password: '',
    password2: '',
  })

  const { first_name, last_name, introduction, email, phone_number, profile_picture, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(authReset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('The passwords entered do not match.')
    } else {

      // console.log(`profile_picture -> ${profile_picture}`)
      const userData = {
        first_name,
        last_name,
        introduction,
        email,
        phone_number,
        profile_picture,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    
      <section>
        <form onSubmit={onSubmit}>
              <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6}>

                    <Grid item xs={12} >
                      <Typography sx={{fontFamily:'Libre Caslon Text', paddingTop: '150px', paddingLeft: '160px'}} variant="h2" align="left">
                        

                      <span style={{ color: '#7A3385' }}>Friend</span><span style={{ color: '#335985' }}>Loop</span>

                      </Typography>
                      <Typography sx={{fontFamily:'Libre Caslon Text', paddingTop: '25px',  paddingLeft: '160px' }} variant="h6" align="left">
                        

                        <span style={{ color: '#335985' }}>Express Yourself, Connect with Others.</span>
        
                      </Typography>
                    </Grid>

                  </Grid>
                  <Grid item xs={6} > 
                      <Grid container spacing={2}  sx={{paddingTop: '50px'}}>
                          {/* Initial Row */}
                          <Grid item xs={4}>
                          
                          </Grid>
                          <Grid item xs={4} align='center' >
                            <ImageUploader
                            width={150}
                            height={150}
                            shape="circle"
                            maxImages={1} 
                            onImageUpload={(base64) =>
                              
                              setFormData((prevState) => ({
                                ...prevState,
                                profile_picture: base64,
                              }))
                            }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            
                          </Grid>
                          {/* First Row */}
                          <Grid item xs={2}>
                            
                          </Grid>
                          <Grid item xs={4}>
                            <CustomTextbox
                                type='text'
                                id='first_name'
                                name='first_name'
                                value={first_name}
                                placeholder='Fill in your first name'
                                label="First Name"
                                onChange={onChange}
                              />
                            
                          </Grid>
                          <Grid item xs={4}>
                            <CustomTextbox
                              type='text'
                              id='last_name'
                              name='last_name'
                              value={last_name}
                              placeholder='Fill in your last name'
                              label="Last Name"
                              onChange={onChange}
                            />
                            
                          </Grid>
                          <Grid item xs={2}>
                            
                          </Grid>
                          {/* Second Row */}
                            <Grid item xs={2}>
                            
                            </Grid>
                            <Grid item xs={8}>
                              <CustomTextbox
                                type='text'
                                id='introduction'
                                name='introduction'
                                value={introduction}
                                placeholder='Fill in introdction. E.g. A passionate chef'
                                label='Introduction'
                                onChange={onChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              
                            </Grid>
                             {/* Third Row */}

                            <Grid item xs={2}>
                              
                              </Grid>
                              <Grid item xs={8}>
                                <CustomTextbox
                                  type='text'
                                  id='phone_number'
                                  name='phone_number'
                                  value={phone_number}
                                  placeholder='Fill in your phone number'
                                  label='Phone Number'
                                  onChange={onChange}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                
                              </Grid>
                              {/* Forth Row */}

                              <Grid item xs={2}>
                                
                                </Grid>
                                <Grid item xs={8}>
                                  <CustomTextbox
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    placeholder='Fill in your email'
                                    label='Email'
                                    onChange={onChange}
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  
                                </Grid>
                                {/* Fifth Row */}
                                <Grid item xs={2}>
                              
                              </Grid>
                              <Grid item xs={4}>
                                <CustomTextbox
                                  type='password'
                                  id='password'
                                  name='password'
                                  value={password}
                                  placeholder='Enter password'
                                  label='Password'
                                  onChange={onChange}
                                />
                                
                              </Grid>
                              <Grid item xs={4}>
                                <CustomTextbox
                                  type='password'
                                  id='password2'
                                  name='password2'
                                  value={password2}
                                  label='Confirm Password'
                                  placeholder='Confirm password'
                                  onChange={onChange}
                                />
                                
                              </Grid>
                              <Grid item xs={2}>
                              
                              </Grid>
                               {/* Sixth Row */}
                               <Grid item xs={2}>
                              
                              </Grid>
                               <Grid item xs={4} align="left"  sx={{fontFamily:'lato', color: '#335985'}}>
                                Have an account? &nbsp;
                              <Link to='/login'>
                                    Login here
                                </Link>
                              </Grid>
                              <Grid item xs={4} align="right">
                              <GradientButton type="submit" text="REGISTER" />
                              </Grid>
                              <Grid item xs={2}>
                              
                              </Grid>

                              {/* Sixth Row */}
                      </Grid>
                  </Grid>
              </Grid>
        
              <Grid container spacing={2} sx={{paddingTop: '50px'}}>
            </Grid>
        </form>
      </section>
    </>
  )
}

export default Register