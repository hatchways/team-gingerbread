import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  searchTerm: string;
}

const LocationSearchBar = ({ searchTerm }: Props): JSX.Element => {
  return (
    <TextField
      color="primary"
      variant="outlined"
      value={searchTerm}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LocationSearchBar;
