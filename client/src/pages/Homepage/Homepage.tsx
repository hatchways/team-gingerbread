import useStyles from './useStyles';
export default function Homepage(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.homePageWrapper}>
      <h1>This is the Home Page</h1>
    </div>
  );
}
