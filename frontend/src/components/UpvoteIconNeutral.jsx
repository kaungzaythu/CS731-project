import React from 'react';
import { useDispatch } from "react-redux";
import { updateVoteDB,updateVote } from '../features/mediaContents/mediaContentSlice'

const UpvoteIconNeutral = ({ voterId, mediaContentId }) => {

const dispatch = useDispatch()
const handleClick = () => {
    console.log('Upvote Neutral clicked');

    const voteData = {
        user_id: voterId,
        vote_action: 'up_vote',
        mediaContentId: mediaContentId
    }
    // dispatch(updateVote(voteData))
    dispatch(updateVoteDB(voteData))
  };


    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 6 24 12"
        fill="none"
        stroke="none"
        width="35"
        height="35"
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          transition: '0.3s',
        }} 
        className="upvote-icon-neutral"
      >
        <style>
          {`
            .upvote-icon-neutral:hover circle {
              fill: #54A12F;
            }
          `}
        </style>
        <defs>
          <linearGradient id="upvote-gradient-neutral" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={'#C0C0C0'} />
            <stop offset="100%" stopColor={'#808080'} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#upvote-gradient-neutral)" />
        <path d="M12 8L6 14H18L12 8Z" fill="#fff" />
      </svg>
    );
  
};

export default UpvoteIconNeutral;