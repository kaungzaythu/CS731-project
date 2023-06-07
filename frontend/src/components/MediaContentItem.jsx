import { useDispatch } from "react-redux"
import {deleteMediaContent} from '../features/mediaContents/mediaContentSlice'
import { Grid, Box, IconButton, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import UpvoteIcon from "./UpvoteIcon";
import DownvoteIcon from "./DownvoteIcon";


function MediaContentItem({mediaContent}) {

    const dispatch = useDispatch()

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      return `${formattedDate}`;
    };

    const renderImages = () => {
      const images = mediaContent.image;
    
      if (!images || images.length === 0) {
        return null; // No images to render
      }
    
      if (images.length === 1) {
        return (
          <div style={{ height: '200px' }}>
            <img src={`data:image/png;base64, ${images[0]}`}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      } else if (images.length === 2) {
        return (
          <div style={{ height: '200px', display: 'flex' }}>
            <img src={`data:image/png;base64, ${images[0]}`}  style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
            <img src={`data:image/png;base64, ${images[1]}`}  style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      } else if (images.length === 3) {
        return (
          <div style={{ height: '200px', display: 'flex' }}>
            <img src={`data:image/png;base64, ${images[0]}`}  style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <img src={`data:image/png;base64, ${images[1]}`}  style={{ width: '100%', height: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
              <img src={`data:image/png;base64, ${images[2]}`}  style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        );
      }
    
      return null;
    };

  return (
    <>
    <Grid >

        <Box 
          sx={{
            backgroundColor: '#EBECF9',
            height: '100%',
            width: '100%',
            border: '2px solid rgba(122, 51, 133, 0.3)',
            boxShadow: '5px 5px 10px 0px rgba(166, 171, 189, 1)',
            borderRadius: '4px',
          }}>
          

          <Box display="flex" flexDirection="column" p={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Avatar src="/path/to/avatar.jpg" alt="Kvatar" style={{ color: '#7A3385'}}/>
                <Box ml={2}>
                  <Typography variant="subtitle1">
                    {mediaContent.user.first_name + ' ' + mediaContent.user.last_name}
                    </Typography>
                  <Typography sx={{ fontFamily: 'Lato', fontSize: 12, fontWeight: 'bold', color:'#335985'}}>
                    {formatDate(mediaContent.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="left">
                
                <IconButton size="big" style={{ color: '#7A3385'}}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
            <Box mt={2}>
                    <Typography sx={{ fontFamily: 'Lato', fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>
                      {mediaContent.content_description}
                    </Typography>
                    <br></br>
                    {renderImages()}
                    {/* <img src="/path/to/image.jpg" alt="Post Image" style={{ maxWidth: '100%' }} /> */}
            </Box>


            <Box display="flex" alignItems="center" mt={2}>
              <UpvoteIcon />
              <Typography 
               sx={{mx:3, fontFamily: 'Lato', fontSize: 12, fontWeight: 'bold', color:'#000000'}}>
                {mediaContent.vote_count}
              </Typography>
              <DownvoteIcon />
            </Box>
      </Box>
         
         
        </Box>
    </Grid>

    <div>
        <div>
          {/* {new Date(mediaContent.createdAt).toLocaleString('en-US')} */}
          {/* {mediaContent.image} */}
     
        </div>
        <h2>{mediaContent.text}</h2>
        
      </div></>
  )
}

export default MediaContentItem