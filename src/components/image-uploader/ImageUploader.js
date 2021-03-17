import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import URL from '../../constants/URL';
import useApi from '../../hooks/useApi';
import { postDefaultOptions } from '../../hooks/defaultOptions';
import styles from './styles';

const ImageUploader = ({ classes }) => {
  const history = useHistory();
  const uploadApi = useApi(null);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [isToastOpen, setToastOpen] = useState(false);

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      formData.append('file', selectedFiles);
      uploadApi.setRequest({
        url: URL.uploadImage,
        options: {
          ...postDefaultOptions,
          headers: {
            'Content-Type': 'application/json'
          },
          data: formData
        }
      });
    }
  };

  const handleChange = (e) => {
    setSelectedFiles(e.target.files[0]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  useEffect(() => {
    if (uploadApi.response?.data) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [uploadApi.response]);

  useEffect(() => {
    if (uploadApi.error) {
      setToastOpen(true);
    }
  }, [uploadApi.error]);

  return (
    <div className={classes.root}>
      {uploadApi.isLoading ? (
        <div className="app-info-container">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          <TextField
            id="standard-full-width"
            type="file"
            style={{ margin: '1rem' }}
            label="Upload Image"
            placeholder="Select Image"
            fullWidth
            variant="filled"
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <div style={{ textAlign: 'right' }}>
            <Button
              disabled={!selectedFiles}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={isToastOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {uploadApi.error?.response?.data?.message || 'Update Failed'}
        </Alert>
      </Snackbar>
    </div>
  );
};

ImageUploader.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles, { name: 'ImageUploader' })(ImageUploader);
