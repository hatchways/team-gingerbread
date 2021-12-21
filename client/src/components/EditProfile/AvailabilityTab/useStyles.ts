import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  weekButton: {
    padding: 10,
    borderRadius: theme.shape.borderRadius,
    fontSize: 12,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: '1s',
    '&:hover': {
      backgroundColor: '#30E664',
    },
  },
}));

export default useStyles;
