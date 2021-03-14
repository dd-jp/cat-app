import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './styles';

const ImageUploader = ({ classes }) => {
  const history = useHistory();

  return (
    <div className={classes.root}>
      <TextField
        id="standard-full-width"
        type="file"
        style={{ margin: '1rem' }}
        label="Upload Image"
        placeholder="Select Image"
        fullWidth
        variant="filled"
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <div style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onClick={() => history.push('/')}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles, { name: 'ImageUploader' })(ImageUploader);
