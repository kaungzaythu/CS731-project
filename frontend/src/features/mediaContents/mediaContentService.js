import axios from 'axios'

const API_URL = '/api/mediaContents/'

// Create new media content
const createMediaContent = async (mediaContentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, mediaContentData, config)

  return response.data
}

const updateVote = async (voteData) => {
  const mediaContentId = voteData.mediaContentId
  const newVoteData = {
    user_id: voteData.user_id,
    vote_action: voteData.vote_action
  }

  const response = await axios.put(API_URL + 'updateVote/' + mediaContentId, newVoteData)

  return response.data
}

// Get user media contents
const getMediaContents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user media content
const deleteMediaContent = async (mediaContentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + mediaContentId, config)

  return response.data
}

const mediaContentService = {
  createMediaContent,
  getMediaContents,
  deleteMediaContent,
  updateVote,
}

export default mediaContentService