import React, { useState } from 'react';
import { Typography, Box, Grid, Avatar, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './useStyles';

const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  const [displayPhoto, setDisplayPhoto] = useState<string>('');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const onPhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File = (e.target.files as FileList)[0];
    const fileURL = URL.createObjectURL(file);
    setIsUploaded(true);
    setDisplayPhoto(fileURL);
  };

  return (
    <Grid container alignItems="center" direction="column" className={classes.root}>
      <Grid item xs={12} sm={8} md={7}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box width="100%" maxWidth={450} alignSelf="center">
            <Typography color="textPrimary" className={classes.title}>
              Profile Photo
            </Typography>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={12} sm={8} md={7}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box width="100%" maxWidth={450} alignSelf="center">
                    {!isUploaded ? (
                      <Avatar className={classes.avatar}>
                        <AccountCircleIcon className={classes.icon} />
                      </Avatar>
                    ) : (
                      <Avatar className={classes.avatar}>
                        <img src={displayPhoto} className={classes.photo} />
                      </Avatar>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={12} sm={8} md={7}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box>
                    <Typography color="textPrimary" className={classes.reminderTxt}>
                      Please use a photo that clearly shows your face.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box alignSelf="center">
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={onPhotoUploadChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        startIcon={<CloudUploadIcon />}
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        size="large"
                        component="span"
                      >
                        <Typography color="primary" className={classes.uploadBtnTxt}>
                          Upload a photo from your device
                        </Typography>
                      </Button>
                    </label>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={12} sm={8} md={7}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box alignSelf="center">
                    <Button startIcon={<DeleteIcon />} onClick={() => setIsUploaded(false)} className={classes.button}>
                      <Typography color="textPrimary" className={classes.deleteBtnTxt}>
                        Delete photo
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePhoto;
