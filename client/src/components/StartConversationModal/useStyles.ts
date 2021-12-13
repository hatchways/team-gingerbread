import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '10px',
      boxShadow: theme.shadows[5],
      padding: '0px 20px 40px 30px',
    },
  }),
);

export default useStyles;
