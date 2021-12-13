import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'transparent',
    },
    '& .MuiInput-underline:after': {
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    width: '100%',
  },
})(TextField);

export default CustomTextField;
