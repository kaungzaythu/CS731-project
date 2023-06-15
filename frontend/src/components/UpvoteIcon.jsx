// import React from 'react';

// class UpvoteIcon extends React.Component {

//   handleClick = () => {
//     // Handle upvote logic here
//     const { voter_id, mediaContent_id } = this.props;
//     console.log('Voter ID => ' + voter_id);
//     console.log('Content ID => ' + mediaContent_id);
    
//   };

//   render() {

//     const { color } = this.props;

//     let gradientColor1, gradientColor2;
//     if (color === 'neutral_up') {
//       gradientColor1 = '#C0C0C0';
//       gradientColor2 = '#808080';
//     } else {
//       gradientColor1 = '#84D138';
//       gradientColor2 = '#54A12F';
//     }

//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="2 6 24 12"
//         fill="none"
//         stroke="none"
//         width="35"
//         height="35"
//         onClick={this.handleClick}
//         style={{
//           cursor: 'pointer',
//           transition: '0.3s',
//         }}
//         className={color === 'neutral_up' ? 'neutral_up' : 'active_up'}
//       >
//         <style>
//         {`
//             .neutral_up:hover circle {
//               fill: #54A12F;
//             }
//             .active_up:hover circle {
//               fill: #54A12F;
//             }
//           `}
//         </style>
//         <defs>
//           <linearGradient id="upvote-gradient" gradientTransform="rotate(90)">
//             <stop offset="0%" stopColor={gradientColor1} />
//             <stop offset="100%" stopColor={gradientColor2} />
//           </linearGradient>
//         </defs>
//         <circle cx="12" cy="12" r="10" fill="url(#upvote-gradient)" />
//         <path d="M12 8L6 14H18L12 8Z" fill="#fff" />
//       </svg>
//     );
//   }
// }

// export default UpvoteIcon;
import React from 'react';
import { useDispatch } from "react-redux";
import { updateVoteDB,updateVote } from '../features/mediaContents/mediaContentSlice'

const UpvoteIcon  = ({ voterId, mediaContentId }) => {

  const dispatch = useDispatch()
  const handleClick = () => {
    console.log('upvote clicked');
  
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
          fill: '#54A12F'
        }}
      >
        <defs>
          <linearGradient id="upvote-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#84D138" />
            <stop offset="100%" stopColor="#54A12F" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#upvote-gradient)" />
        <path d="M12 8L6 14H18L12 8Z" fill="#fff" />
      </svg>
    );
  
}

export default UpvoteIcon;