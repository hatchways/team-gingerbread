import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useSocket } from '../../context/useSocketContext';
import useStyles from './useStyles';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { initSocket, disconnect } = useSocket();

  useEffect(() => {
    initSocket();

    return () => {
      disconnect();
    };
  }, [initSocket, disconnect]);

  return <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}></Grid>;
}
