import React, { useState } from 'react';
import { Typography, Box, Grid, Avatar, Button, InputLabel } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import uploadImage from '../../../helpers/APICalls/uploadImage';
import deleteImage from '../../../helpers/APICalls/deleteImage';
import useStyles from './useStyles';

const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [displayPhoto, setDisplayPhoto] = useState<string>('');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isWrongFileType, setIsWrongFileType] = useState<boolean>(false);

  const onPhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File = (e.target.files as FileList)[0];
    const fileURL = file ? URL.createObjectURL(file) : '';
    const images = [];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setIsUploaded(true);
      setIsWrongFileType(false);
      setDisplayPhoto(fileURL);
      if (loggedInUser) {
        images.push(file);
        uploadImage(images, loggedInUser.profile).then((data) => {
          if (data.error) updateSnackBarMessage('An error occurred while uploading the image.');
        });
      }
    } else setIsWrongFileType(true);
  };

  const onDeletePhotoClick = (): void => {
    setIsUploaded(false);
    if (loggedInUser) {
      deleteImage(loggedInUser.profile).then((data) => {
        if (data.error) updateSnackBarMessage('An error occurred while deleting the image.');
      });
    }
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
                    <Avatar className={classes.avatar}>
                      {!isUploaded ? (
                        <AccountCircleIcon className={classes.icon} />
                      ) : (
                        <img src={displayPhoto} alt="profile image" className={classes.photo} />
                      )}
                    </Avatar>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={12} sm={8} md={7}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box>
                    {!isWrongFileType ? (
                      <Typography color="textPrimary" className={classes.reminderTxt}>
                        Please use a photo that clearly shows your face.
                      </Typography>
                    ) : (
                      <Typography className={classes.validationText}>Please upload a jpeg or png file type.</Typography>
                    )}
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
                    <InputLabel htmlFor="contained-button-file">
                      <Button
                        startIcon={<CloudUploadIcon />}
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        size="large"
                        component="span"
                      >
                        <Typography color="primary" className={classes.uploadBtnTxt}>
                          Upload a profile photo
                        </Typography>
                      </Button>
                    </InputLabel>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Grid item xs={12} sm={8} md={7}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box alignSelf="center">
                    <Button startIcon={<DeleteIcon />} onClick={onDeletePhotoClick} className={classes.button}>
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
