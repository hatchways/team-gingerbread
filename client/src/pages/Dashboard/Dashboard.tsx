import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  return <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}></Grid>;
}
