import React from 'react';

class DownvoteIcon extends React.Component {
  handleClick = () => {
    // Handle downvote logic here
    console.log('Downvote clicked');
  };

  render() {
    const { color } = this.props;

    let gradientColor1, gradientColor2;
    if (color === 'neutral_down') {
      gradientColor1 = '#C0C0C0';
      gradientColor2 = '#808080';
    } else {
      gradientColor1 = '#D13838';
      gradientColor2 = '#A12F2F';
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 6 24 12"
        fill="none"
        stroke="none"
        width="35"
        height="35"
        onClick={this.handleClick}
        style={{
          cursor: 'pointer',
          transition: '0.3s',
        }}
        className={color === 'neutral_down' ? 'neutral_down' : 'active_down'}
      >
        <style>
        {`
            .neutral_down:hover circle {
              fill: #A12F2F;
            }
            .active_down:hover circle {
              fill: #A12F2F;
            }
          `}
        </style>
        <defs>
          <linearGradient id="downvote-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={gradientColor1} />
            <stop offset="100%" stopColor={gradientColor2} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#downvote-gradient)" />
        <path d="M12 16L6 10H18L12 16Z" fill="#fff" />
      </svg>
    );
  }
}

export default DownvoteIcon;