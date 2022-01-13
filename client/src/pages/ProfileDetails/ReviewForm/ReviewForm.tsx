import { useState, useContext } from 'react';
import { Typography, Card, CardContent, Button, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from './useStyles';
import { createReview } from '../../../helpers/APICalls/createReview';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/useAuthContext';
import { SnackBarContext } from '../../../context/useSnackbarContext';

const ReviewForm = (props: any): JSX.Element => {
  const classes = useStyles();
  const [rating, setRating] = useState<number | null>(0);
  const [description, setDescription] = useState('');
  const { id }: { id: string } = useParams();
  const { loggedInUser } = useContext(AuthContext);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { addNewReview } = props;

  const submitReview = () => {
    if (loggedInUser) {
      createReview(id, loggedInUser.id, rating, description).then((data) => {
        if (data.success) {
          updateSnackBarMessage('Review submitted successfully');
          addNewReview({
            sitterId: id,
            clientId: loggedInUser.id,
            rating,
            description,
          });
          setRating(0);
          setDescription('');
        } else {
          updateSnackBarMessage('Error submitting review. Please try again');
        }
      });
    }
  };

  return (
    <Card className={classes.reviewFormCard}>
      <CardContent className={classes.reviewCardContent}>
        <Typography className={classes.reviewCardHeader}>leave a review</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          className={classes.ratingComponent}
        />
        <TextField
          className={classes.reviewTextBox}
          variant="outlined"
          multiline
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={() => submitReview()} className={classes.submitReviewButton}>
          submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
