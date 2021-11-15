import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  accAside: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 400,
    textAlign: 'center',
    marginRight: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  link: {
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 400,
  },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#3a8dff',
    boxShadow: 'none',
    marginRight: 35,
  },
}));

export default useStyles;
