import React, { useEffect } from 'react';

const AnimatedButton = () => {
  useEffect(() => {
    const rect = document.querySelector('.btn-101 rect');
    rect.style.animationPlayState = 'running';
  }, []);

  return (
    <button className="btn-101" style={styles.button}>
      Glow Button
      <svg style={styles.svg}>
        <defs>
          <filter id="glow">
            <feGaussianBlur result="coloredBlur" stdDeviation="5"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <rect style={styles.rect} />
      </svg>
    </button>
  );
};

const styles = {
  button: {
    '--thickness': '0.3rem',
    '--roundness': '1.2rem',
    '--color': '#7A3385',
    '--opacity': '0.6',
    WebkitBackdropFilter: 'blur(100px)',
    backdropFilter: 'blur(100px)',
    background: 'none',
    backgroundColor: 'hsla(0, 0%, 100%, 0.2)',
    border: 'none',
    borderRadius: 'var(--roundness)',
    color: 'var(--color)',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'Poppins, "sans-serif"',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.8rem 3rem',
    position: 'relative'
  },
  svg: {
    borderRadius: 'var(--roundness)',
    display: 'block',
    filter: 'url(#glow)',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%'
  },
  rect: {
    fill: 'none',
    stroke: 'var(--color)',
    strokeWidth: 'var(--thickness)',
    rx: 'var(--roundness)',
    strokeLinejoin: 'round',
    strokeDasharray: '185%',
    strokeDashoffset: '80',
    WebkitAnimation: 'snake 2s linear infinite',
    animation: 'snake 2s linear infinite',
    height: '100%',
    opacity: 'var(--opacity)',
    width: '100%'
  }
};

export default AnimatedButton;