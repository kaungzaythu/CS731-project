import React from 'react';

class DownvoteIcon extends React.Component {
  handleClick = () => {
    // Handle downvote logic here
    console.log('Downvote clicked');
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
          <linearGradient id="downvote-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#D13838" />
            <stop offset="100%" stopColor="#A12F2F" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#downvote-gradient)" />
        <path d="M12 16L6 10H18L12 16Z" fill="#fff" />
      </svg>
    );
  }
}

export default DownvoteIcon;