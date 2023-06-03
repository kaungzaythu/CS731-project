import { useDispatch } from "react-redux"
import {deleteMediaContent} from '../features/mediaContents/mediaContentSlice'

function MediaContentItem({mediaContent}) {

    const dispatch = useDispatch()
  return (
    <div>
        <div>
            {new Date(mediaContent.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{mediaContent.text}</h2>
        <button onClick={() => dispatch(deleteMediaContent(mediaContent._id))}>X</button>
    </div>
  )
}

export default MediaContentItem