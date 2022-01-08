import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reviewFormCard: {
    width: '80%',
    minWidth: 400,
    minHeight: 300,
  },
  reviewCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  reviewCardHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  ratingComponent: {
    marginTop: 10,
  },
  reviewTextBox: {
    marginTop: 10,
    width: '95%',
  },
  submitReviewButton: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: 160,
    height: 56,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: '1s',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#30E664',
    },
  },
}));

export default useStyles;
