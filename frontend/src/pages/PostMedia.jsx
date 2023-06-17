// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Grid from "@mui/material/Grid";
// import LeftSection from "../components/LeftSection";
// import Spinner from "../components/Spinner";
// import "../style.css";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { TextField } from "@mui/material";
// import MultipleImageUploader from "../components/MultipleImageUploader";
// import GradientButton from "../components/GradientButton";
// import { toast } from 'react-toastify'
// import { createMediaContent } from '../features/mediaContents/mediaContentSlice'

// function PostMedia() {
//   const [formData, setFormData] = useState({
//     content_description: "",
//     media_images: "",
//   });

//   const { content_description, media_images } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);
//   const { mediaContents, isLoading, isError, message } = useSelector(
//     (state) => state.mediaContents
//   );
//   useEffect(() => {
//     if (isError) {
//       console.log(message);
//     }

//     if (!user) {
//       navigate("/login");
//     } else {
//       // dispatch(getMediaContents())
//     }

//     return () => {
//       // dispatch(reset())
//       // navigate("/");
//     };
//   }, [user, navigate, isError, message, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
   
//     if (content_description === '') {
//       toast.error('Say Something!')
//     } else {

//       console.log(`This is user ${user._id}`)
//       var user_id = user._id
//       const mediaContentData = {
//         user: user_id,
//         content_description,
//         image: media_images
//         // ...(media_images && { image: media_images })
//       }

//       await dispatch(createMediaContent(mediaContentData))
//       navigate("/");
//     }
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       <section>
//         <form onSubmit={onSubmit}>
//           <Grid container spacing={2} justifyContent="center">
        
//             <Grid item xs={12}>
             
//               <Box
//                 sx={{
//                   backgroundColor: "#EBECF9",
//                   border: "2px solid rgba(122, 51, 133, 0.3)",
//                   boxShadow: "5px 5px 10px 0px rgba(166, 171, 189, 1)",
//                   borderRadius: "4px",
//                 }}
//               >
//                 <Box p={5}>
//                   <TextField
//                     label="What is on your mind? Say Something"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     placeholder="What is on your mind? Say Something"
//                     onChange={onChange}
//                     id='content_description'
//                     name='content_description'
//                     value={content_description}
//                   />
//                 </Box>

//                 <Box pl={5} pr={5} pb={5}>
//                   <MultipleImageUploader
//                     width={100}
//                     height={100}
//                     shape="rectangle"
//                     maxImages={3}
//                     onImageUpload={(base64Array) =>
//                       setFormData((prevState) => ({
//                         ...prevState,
//                         media_images: base64Array.slice(0, 3),

//                       }))
//                     }
//                   />
//                 </Box>

//                 <Box
//                   pr={5}
//                   pb={3}
//                   style={{ display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <GradientButton type="submit" text="CREATE" />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </section>
//     </>
//   );
// }

// export default PostMedia;

import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import LeftSection from "../components/LeftSection";
import Spinner from "../components/Spinner";
import "../style.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import MultipleImageUploader from "../components/MultipleImageUploader";
import GradientButton from "../components/GradientButton";
import { toast } from "react-toastify";
import { createMediaContent, getMediaContents} from "../features/mediaContents/mediaContentSlice";

function PostMedia() {
  const [formData, setFormData] = useState({
    content_description: "",
    media_images: "",
    showImageUploader: false, // Added state for showing/hiding image uploader
  });

  const { content_description, media_images, showImageUploader } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { mediaContents, isLoading, isError, message } = useSelector(
    (state) => state.mediaContents
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      // dispatch(getMediaContents())
    }

    return () => {
      // dispatch(reset())
      // navigate("/");
    };
  }, [user, navigate, isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleImageUploader = () => {
    setFormData((prevState) => ({
      ...prevState,
      showImageUploader: !prevState.showImageUploader,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (content_description === "") {
      toast.error("Say Something!");
    } else {
      console.log(`This is user ${user._id}`);
      var user_id = user._id;
      const mediaContentData = {
        user: user_id,
        content_description,
        image: media_images,
        // ...(media_images && { image: media_images })
      };

      await dispatch(createMediaContent(mediaContentData));
      // navigate("/");
      dispatch(getMediaContents())
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "#EBECF9",
                  border: "2px solid rgba(122, 51, 133, 0.3)",
                  boxShadow: "5px 5px 10px 0px rgba(166, 171, 189, 1)",
                  borderRadius: "4px",
                }}
              >
                <Box p={2}>
                  <TextField
                    label="What is on your mind? Say Something"
                    multiline
                    rows={2}
                    fullWidth
                    placeholder="What is on your mind? Say Something"
                    onChange={onChange}
                    id="content_description"
                    name="content_description"
                    value={content_description}
                  />
                </Box>

                {showImageUploader ? (
                  <Box pl={2} pr={2} pb={2}>
                    <MultipleImageUploader
                      width={100}
                      height={100}
                      shape="rectangle"
                      maxImages={3}
                      onImageUpload={(base64Array) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          media_images: base64Array.slice(0, 3),
                        }))
                      }
                    />
                  </Box>
                ) : null}

                <Box
                  pr={2}
                  pb={3}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >

                  <Box 
                  pr={2}>
                    {showImageUploader ? (
                      <Button onClick={toggleImageUploader} color="secondary">
                        Hide
                      </Button>
                    ) : (
                      <Button onClick={toggleImageUploader} color="primary">
                        Add Image
                      </Button>
                    )}
                  </Box>

                  <Box>
                    <GradientButton type="submit" text="CREATE" />
                  </Box>

                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
}

export default PostMedia;