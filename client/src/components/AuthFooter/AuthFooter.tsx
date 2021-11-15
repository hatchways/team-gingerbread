import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthFooter = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} display="flex" alignSelf="center" justifyContent="center" alignItems="center" flexWrap="wrap">
      <Typography className={classes.accAside}>{asideText}</Typography>
      <Link to={linkTo} color="primary" className={classes.link}>
        {btnText}
      </Link>
    </Box>
  );
};

export default AuthFooter;
