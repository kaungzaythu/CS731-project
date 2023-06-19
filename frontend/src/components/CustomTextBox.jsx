import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '@fontsource/lato/300.css';

const CustomTextbox = ({ type, id, name, value, label, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasText = value.trim() !== '';

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const renderToggleVisibility = () => {
    if (type === 'password') {
      return (
        <InputAdornment position="end" sx={{ alignItems: 'center' }}>
        <IconButton
          onClick={togglePasswordVisibility}
          edge="end"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{ backgroundColor: 'transparent', paddingRight: 10 }}
        >
          {showPassword ? <VisibilityOff style={{ color: '#7A3385' }} /> : <Visibility style={{ color: '#7A3385' }} />}
        </IconButton>
      </InputAdornment>
      );
    }
    return null;
  };

  return (
    <TextField
      type={showPassword ? 'text' : type}
      id={id}
      name={name}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        '& .MuiOutlinedInput-input': {
          backgroundColor: 'white',
          color: hasText ? '#7A3385' : 'inherit',
          '&:hover, &:focus': {
            color: '#7A3385',
          },
        },
        '& .MuiInputLabel-root': {
          color: hasText ? '#7A3385' : '#335985',
          '&.Mui-focused': {
            color: '#7A3385',
          },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: hasText ? '#7A3385' : '#335985',
          },
          '&:hover fieldset': {
            borderColor: hasText ? '#7A3385' : '#335985',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#7A3385',
          },
        },
      }}
      InputProps={{
        classes: {
          input: 'custom-font-input',
        },
        endAdornment: renderToggleVisibility(),
      }}
    />
  );
};

export default CustomTextbox;