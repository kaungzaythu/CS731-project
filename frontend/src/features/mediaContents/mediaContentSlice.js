import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import mediaContentService from './mediaContentService'

const initialState = {
  mediaContents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new media content
export const createMediaContent = createAsyncThunk(
  'mediaContents/create',
  async (mediaContentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.createMediaContent(mediaContentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user media contents
export const getMediaContents = createAsyncThunk(
  'mediaContents/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.getMediaContents(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user media contents
export const getMediaContentsSilent = createAsyncThunk(
  'mediaContents/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.getMediaContents(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user media content by ID
export const getMediaContentByUserID = createAsyncThunk(
  'mediaContents/',
  async (user_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.getMediaContentByUserID(user_id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateVoteDB = createAsyncThunk(
  'mediaContents/updateVote',
  async (voteData, thunkAPI) => {
    try {
      return await mediaContentService.updateVote(voteData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

export const updateCommentDB = createAsyncThunk(
  'mediaContents/updateComment',
  async (commentData, thunkAPI) => {
    try {
      return await mediaContentService.updateComment(commentData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
    
  }
)

// Delete user media contents
export const deleteMediaContent = createAsyncThunk(
  'mediaContents/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.deleteMediaContent(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get comment user data
export const getCommentUser = createAsyncThunk(
  'mediaContents/fetchCommentUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await mediaContentService.getCommentUser(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const mediaContentSlice = createSlice({
  name: 'mediaContent',
  initialState,
  reducers: {
    reset: (state) => initialState,
    updateComment(state, action) {
      const { mediaContentId, comment, user} = action.payload;
      const newComment = {
        user: user,
        date_time: new Date(),
        comment: comment,
        mediaContentId: mediaContentId
     }
    
      // Find the mediaContent by mediaContentId
      const mediaContent = state.mediaContents.find(
        (content) => content._id === mediaContentId
      );
    
      // If the mediaContent is found, add the new comment
      if (mediaContent) {
        mediaContent.comments.push(newComment);
      }

      return state;
    },
    updateVote(state, action) {
      const { mediaContentId, vote_action, user_id} = action.payload;

      const voteData = {
        user_id: user_id,
        vote_action: vote_action,
        mediaContentId: mediaContentId
      }

      // Find the mediaContent by mediaContentId
      const mediaContent = state.mediaContents.find(
        (content) => content._id === mediaContentId
      );
    
      // If the mediaContent is found, add the new comment
      if (mediaContent) {
          if (vote_action === 'up_vote') {
            const upVoteIndex = mediaContent.up_vote.findIndex((item) => item.user_id === user_id);
            if (upVoteIndex !== -1) {
              // If user_id exists, delete the item
              mediaContent.up_vote.splice(upVoteIndex, 1);
            } else {
              // If user_id doesn't exist, add the item
              mediaContent.up_vote.push({ user_id: user_id });
            }

            // remove from down_vote
            const downVoteIndex = mediaContent.down_vote.findIndex((item) => item.user_id === user_id);
            if (downVoteIndex !== -1) {
              // If user_id exists, delete the item
              mediaContent.down_vote.splice(downVoteIndex, 1);
            }
          }
          else if (vote_action === 'down_vote') {
            const downVoteIndex = mediaContent.down_vote.findIndex((item) => item.user_id === user_id);
            if (downVoteIndex !== -1) {
              // If user_id exists, delete the item
              mediaContent.down_vote.splice(downVoteIndex, 1);
            } else {
              // If user_id doesn't exist, add the item
              mediaContent.down_vote.push({ user_id: user_id });
            }

            // remove from up_vote
            const upVoteIndex = mediaContent.up_vote.findIndex((item) => item.user_id === user_id);
            if (upVoteIndex !== -1) {
              // If user_id exists, delete the item
              mediaContent.up_vote.splice(upVoteIndex, 1);
            } 
          }
        // mediaContent.comments.push(newComment);
      }

      return state;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createMediaContent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMediaContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mediaContents.push(action.payload)
      })
      .addCase(createMediaContent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMediaContents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMediaContents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mediaContents = action.payload
      })
      .addCase(getMediaContents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMediaContentByUserID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMediaContentByUserID.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mediaContents = action.payload
      })
      .addCase(getMediaContentByUserID.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMediaContent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMediaContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mediaContents = state.mediaContents.filter(
          (mediaContent) => mediaContent._id !== action.payload.id
        )
      })
      .addCase(deleteMediaContent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // .addCase(updateVoteDB.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(updateVoteDB.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.mediaContents.push(action.payload)
      // })
      // .addCase(updateVoteDB.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
  },
})
export const { updateVote } = mediaContentSlice.actions;
export const { updateComment } = mediaContentSlice.actions;
export const { reset } = mediaContentSlice.actions
export default mediaContentSlice.reducer