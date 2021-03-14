import { withStyles } from '@material-ui/core';
import { shape, string } from 'prop-types';

import styles from './styles';

const ImageContainer = ({ classes }) => {
  return <div className={classes.root}>Image container</div>;
};

ImageContainer.propTypes = {
  classes: shape({ root: string.isRequired }).isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(ImageContainer);
