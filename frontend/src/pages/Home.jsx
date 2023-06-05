import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MediaContentForm from '../components/MediaContentForm'
import MediaContentItem from '../components/MediaContentItem'
import Spinner from '../components/Spinner'
import { getMediaContents, reset } from '../features/mediaContents/mediaContentSlice'

function Home() {
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
      <section>
        <h1>Welcome {user && user.name}</h1>
        <p>This is your personalized page</p>
      </section>

      <MediaContentForm />

      <section>
        {mediaContents.length > 0 ? (
          <div>
            {mediaContents.map((mediaContent) => (
              <MediaContentItem key={mediaContent._id} mediaContent={mediaContent} />
            ))}
          </div>
        ) : (
          <h3>You have not create any media contents</h3>
        )}
      </section>
    </>
  )
}

export default Home