import { TextField, InputAdornment } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

interface Props {
  searchTerm: string;
}

const AvailabilitySearchBar = ({ searchTerm }: Props): JSX.Element => {
  return (
    <TextField
      color="primary"
      variant="outlined"
      value={searchTerm}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <DateRangeIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AvailabilitySearchBar;
