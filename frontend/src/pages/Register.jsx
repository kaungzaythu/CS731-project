import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

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

    if (password !== password2) {
      toast.error('The passwords entered do not match.')
    } else {
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
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='first_name'
              name='first_name'
              value={first_name}
              placeholder='Fill in your first name'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='last_name'
              name='last_name'
              value={last_name}
              placeholder='Fill in your last name'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='introduction'
              name='introduction'
              value={introduction}
              placeholder='Fill in introdction. E.g. A passionate chef'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Fill in your email'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='phone_number'
              name='phone_number'
              value={phone_number}
              placeholder='Fill in your phone number'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='profile_picture'
              name='profile_picture'
              value={profile_picture}
              placeholder='to do later as it gonna be base64'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div>
            <button type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register