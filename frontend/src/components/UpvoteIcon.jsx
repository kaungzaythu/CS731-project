import React from 'react';

class UpvoteIcon extends React.Component {
  handleClick = () => {
    // Handle upvote logic here
    console.log('Upvote clicked');
  };

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 6 24 12"
        fill="none"
        stroke="none"
        width="35"
        height="35"
        onClick={this.handleClick}
        style={{ cursor: 'pointer' }}
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
}

export default UpvoteIcon;