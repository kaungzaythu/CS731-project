
import {useState, userState} from 'react'
import {useDispatch} from 'react-redux'
import {createMediaContent} from '../features/mediaContents/mediaContentSlice'

function MediaContentForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

const onSubmit = (e) => {


  e.preventDefault()

  dispatch(createMediaContent({text}))
  setText('')
}

  return (

    <section>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text">Media Content</label>
          <input type="text" name ='text' id='text' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </section>
  )
}

export default MediaContentForm