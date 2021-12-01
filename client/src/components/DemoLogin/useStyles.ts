import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  demoButton: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
  },
}));

export default useStyles;
