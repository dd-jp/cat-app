import { object } from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import styles from './styles';

const ImageContainerFooter = ({ classes }) => (
  <div className={classes.cardContentContainer}>
    <CardContent>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        className={classes.score}
      >
        Score: 50
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton aria-label="like">
        <ThumbUpAltIcon />
      </IconButton>
      <IconButton aria-label="dislike">
        <ThumbDownIcon />
      </IconButton>
    </CardActions>
  </div>
);

ImageContainerFooter.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(
  ImageContainerFooter
);
