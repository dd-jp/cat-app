import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { number, object, shape, string } from 'prop-types';
import ImageContainerFooter from './ImageContainerFooter';
import styles from './styles';

const ImageContainerTile = ({ classes, tile }) => (
  <Card>
    <CardMedia className={classes.media} image={tile.img} title={tile.title} />
    <GridListTileBar
      title={tile.title}
      titlePosition="top"
      actionIcon={
        <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
          <FavoriteBorderIcon />
        </IconButton>
      }
      actionPosition="left"
      className={classes.titleBar}
    />
    <ImageContainerFooter />
  </Card>
);

ImageContainerTile.propTypes = {
  classes: object.isRequired,
  tile: shape({
    cols: number,
    img: string,
    title: string
  }).isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(
  ImageContainerTile
);
