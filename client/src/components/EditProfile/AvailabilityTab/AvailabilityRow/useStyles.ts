import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  availabilityRow: {
    display: 'grid',
    gridTemplateColumns: '30fr 30fr 30fr 10fr',
    alignItems: 'center',
    padding: '20px 45px',
    width: '90%',
    border: '#dedcdc 1px solid',
    margin: '0 auto',
  },
  availabilityText: {
    color: 'grey',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  availabilityDateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  availabilityLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 18,
  },
  availabilitySelect: {
    height: 36,
    width: 150,
  },
  availableLabel: {
    color: 'black',
    fontSize: 12,
  },
  availableCheckbox: {},
}));

export default useStyles;
