import Button from '@mui/material/Button';
import '@fontsource/lato/300.css';

function GradientButton({ text, type }) {
    const gradientBackground = 'linear-gradient(to right, #7A3385, #CA73D8)';
    const buttonStyle = {
      background: gradientBackground,
      color: '#FFFFFF',
      boxShadow: '10px 10px 20px rgba(192, 156, 198, 0.4)',
      height: '40px', 
      fontSize: '14px', 
      padding: '10px 20px',
      fontFamily: 'Lato'
    };
  
    return (
      <Button varient="contained" type={type} sx={buttonStyle}>
         {text}
      </Button>
    );
  }
  
  export default GradientButton;