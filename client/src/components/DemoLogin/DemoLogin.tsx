import useStyles from './useStyles';
import { Button, CircularProgress } from '@material-ui/core';

interface Props {
  isSubmitting: boolean;
  handleDemo: (email: string, password: string) => void;
}

const DemoLogin = ({ handleDemo, isSubmitting }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Button
      type="button"
      size="large"
      variant="outlined"
      color="primary"
      className={classes.demoButton}
      onClick={() => {
        handleDemo('demouser@demouser.com', '12345678');
      }}
    >
      {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'View Demo'}
    </Button>
  );
};

export default DemoLogin;
