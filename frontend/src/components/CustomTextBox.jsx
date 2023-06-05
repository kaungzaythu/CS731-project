import TextField from '@mui/material/TextField';
import '@fontsource/lato/300.css';

const CustomTextbox = ({ type, id, name, value, label, placeholder, onChange }) => {
  const hasText = value.trim() !== '';
  return (
    <TextField
      type={type}
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
      }}
    />
  );
};

export default CustomTextbox;