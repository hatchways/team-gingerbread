import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  availabilityRow: {
    display: 'grid',
    gridTemplateColumns: '30fr 35fr 35fr',
    alignItems: 'center',
    padding: '20px 45px',
  },
  availabilityForm: {
    display: 'flex',
    alignItems: 'center',
  },
  availabilityLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: 18,
  },
  availabilitySelect: {
    height: 36,
    width: 225,
  },
}));

export default useStyles;
