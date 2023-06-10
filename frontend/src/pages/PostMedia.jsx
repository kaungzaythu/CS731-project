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
import { TextField } from "@mui/material";
import MultipleImageUploader from "../components/MultipleImageUploader";
import GradientButton from "../components/GradientButton";
import { toast } from 'react-toastify'
import { createMediaContent } from '../features/mediaContents/mediaContentSlice'

function PostMedia() {
  const [formData, setFormData] = useState({
    content_description: "",
    media_images: "",
  });

  const { content_description, media_images } = formData;

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

  const onSubmit = async (e) => {
    e.preventDefault();
   
    if (content_description === '') {
      toast.error('Say Something!')
    } else {

      console.log(`This is user ${user._id}`)
      var user_id = user._id
      const mediaContentData = {
        user: user_id,
        content_description,
        ...(media_images && { image: media_images })
      }

      await dispatch(createMediaContent(mediaContentData))
      navigate("/");
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
            {/* First Column */}
            <Grid
              item
              xs={3}
              height="100vh"
              style={{ position: "sticky", top: 0 }}
            >
              <LeftSection />
            </Grid>

            {/* Second Column */}
            <Grid item xs={6}>
              <Box pt={4} pb={4}>
                <Typography
                  sx={{
                    fontFamily: "Libre Caslon Text",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "#335985" }}>Post a Media Content</span>
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#EBECF9",
                  border: "2px solid rgba(122, 51, 133, 0.3)",
                  boxShadow: "5px 5px 10px 0px rgba(166, 171, 189, 1)",
                  borderRadius: "4px",
                }}
              >
                <Box p={5}>
                  <TextField
                    label="What is on your mind? Say Something"
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="What is on your mind? Say Something"
                    onChange={onChange}
                    id='content_description'
                    name='content_description'
                    value={content_description}
                  />
                </Box>

                <Box pl={5} pr={5} pb={5}>
                  <MultipleImageUploader
                    width={100}
                    height={100}
                    shape="rectangle"
                    maxImages={3}
                    onImageUpload={(base64Array) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        media_images: [...prevState.media_images, ...base64Array],
                      }))
                    }
                  />
                </Box>

                <Box
                  pr={5}
                  pb={3}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <GradientButton type="submit" text="CREATE" />
                </Box>
              </Box>
            </Grid>

            {/* Third Column */}
            <Grid
              item
              xs={3}
              height="100vh"
              style={{ position: "sticky", top: 0 }}
            >
              
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
}

export default PostMedia;
