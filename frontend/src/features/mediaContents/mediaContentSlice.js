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

export const updateVote = createAsyncThunk(
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

export const mediaContentSlice = createSlice({
  name: 'mediaContent',
  initialState,
  reducers: {
    reset: (state) => initialState,
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
      .addCase(updateVote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateVote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mediaContents.push(action.payload)
      })
      .addCase(updateVote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = mediaContentSlice.actions
export default mediaContentSlice.reducer