import { withStyles } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { shape, string } from 'prop-types';
import ImageContainerTile from './ImageContainerTile';
import styles from './styles';

const tileData = [
  {
    img: '/static/cfn.jpg',
    title: 'Breakfast',
    author: 'jill111',
    cols: 1,
    featured: false
  },
  {
    img: '/static/bike.jpg',
    title: 'Tasty burger',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/breakfast.jpg',
    title: 'Breakfast1',
    author: 'jill111',
    cols: 1,
    featured: false
  },
  {
    img: '/static/random-dice.jpg',
    title: 'Dice',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/dactfp5-95ae913e-2c91-4a06-bd43-7e70986355d5.png',
    title: 'Dog',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/twitter.jpg',
    title: 'twitter',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  },
  {
    img: '/static/TombRaider.png',
    title: 'TombRaider',
    author: 'director90',
    cols: 1
  }
];

const ImageContainer = ({ classes }) => {
  const desktop = useMediaQuery('(min-width:900px)');
  const tablet = useMediaQuery('(min-width:600px)');

  const getColsForImageGridList = () => {
    if (desktop) return 4;
    if (tablet) return 2;
    return 1;
  };

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={330}
        className={classes.gridList}
        cols={getColsForImageGridList()}
        spacing={4}
      >
        {tileData.map((tile) => (
          <GridListTile
            key={tile.img}
            cols={tile.cols || 1}
            style={{
              paddingTop: '1rem'
            }}
          >
            <ImageContainerTile tile={tile} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

ImageContainer.propTypes = {
  classes: shape({ root: string.isRequired }).isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(ImageContainer);
