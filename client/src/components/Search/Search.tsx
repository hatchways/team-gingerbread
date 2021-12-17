import { ChangeEvent, useState, useEffect, SyntheticEvent } from 'react';
import useStyles from './useStyles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { User } from '../../interface/User';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useDebounce } from 'use-debounce';
import { searchUsers } from '../../helpers/APICalls/searchUsers';

interface Props {
  search: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
  getNewUser: (user: string | User | null) => void;
}
const Search = ({ search, handleChange, getNewUser }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const classes = useStyles();

  const saveOptions = (users: User[]) => {
    setOptions(users);
  };

  useEffect(() => {
    let active = true;

    async function searchAndSaveUsers() {
      setLoading(true);
      if (debouncedSearch) {
        const response = await searchUsers({
          search: debouncedSearch,
        });

        if (active && response && response.users) {
          saveOptions(response.users);
        }
      }
    }

    searchAndSaveUsers();

    return () => {
      active = false;
      saveOptions([]);
    };
  }, [debouncedSearch]);

  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        id="asynchronous-search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.username === value.username}
        getOptionLabel={(option) => option.username}
        options={options}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInputChange={handleChange}
        onChange={(_, value) => {
          if (value && typeof value !== 'string' && loggedInUser && value._id !== loggedInUser.id) {
            getNewUser(value);
          } else {
            updateSnackBarMessage('Unable to start a conversation with oneself. Please pick another user.');
          }
        }}
        inputValue={search}
        noOptionsText="No Users Found"
        freeSolo
        renderInput={(params) => (
          <div className={classes.search}>
            <InputBase
              {...params.inputProps}
              placeholder="Search"
              classes={{
                root: classes.searchRoot,
                input: classes.searchInput,
              }}
              inputProps={{
                'aria-label': 'search',
                ref: params.InputProps.ref,
              }}
              startAdornment={
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              }
            />
          </div>
        )}
      />
    </form>
  );
};

export default Search;
