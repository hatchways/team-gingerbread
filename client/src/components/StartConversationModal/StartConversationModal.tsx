import { ChangeEvent, useState } from 'react';
import { Modal, Grid, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { User } from '../../interface/User';
import Search from '../Search/Search';
import useStyles from './useStyles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  open: boolean;
  search: string;
  handleClose: () => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
  getNewUser: (user: string | User | null) => void;
}

export default function SimpleModal({ open, search, handleClose, getNewUser, handleSearchChange }: Props): JSX.Element {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <h2 id="simple-modal-title">Search for Users</h2>
        </Grid>
        <Grid item>
          <Button onClick={() => handleClose()}>
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
      <Search search={search} handleChange={handleSearchChange} getNewUser={getNewUser} />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
