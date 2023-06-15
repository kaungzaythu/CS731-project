import React from 'react';
import { useDispatch } from "react-redux";
import { updateVoteDB, updateVote } from '../features/mediaContents/mediaContentSlice'

const DownvoteIconNeutral = ({ voterId, mediaContentId }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        const voteData = {
        user_id: voterId,
        vote_action: 'down_vote',
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
          fill: '#A12F2F'
        }} 
        className="downvote-icon-neutral"
      >
        <style>
          {`
            .downvote-icon-neutral:hover circle {
              fill: #A12F2F;
            }
          `}
        </style>
        <defs>
          <linearGradient id="downvote-gradient-neutral" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={'#C0C0C0'} />
            <stop offset="100%" stopColor={'#808080'} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#downvote-gradient-neutral)" />
        <path d="M12 16L6 10H18L12 16Z" fill="#fff" />
      </svg>
    );
  
}

export default DownvoteIconNeutral;