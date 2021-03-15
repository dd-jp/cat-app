import { withStyles } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { arrayOf, func, number, object } from 'prop-types';
import ImageContainerTile from './ImageContainerTile';
import styles from './styles';

const ImageContainer = ({
  classes,
  tileData,
  metaData,
  refreshVoteData,
  refreshFavourites,
  pageCount,
  handlePageChange
}) => {
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
            key={tile.url}
            cols={1}
            style={{
              paddingTop: '1rem'
            }}
          >
            <ImageContainerTile
              tile={tile}
              metaData={metaData[tile.id]}
              refreshVoteData={refreshVoteData}
              refreshFavourites={refreshFavourites}
            />
          </GridListTile>
        ))}
      </GridList>
      <Pagination
        onChange={handlePageChange}
        count={pageCount}
        color="primary"
        className={classes.pagination}
      />
    </div>
  );
};

ImageContainer.propTypes = {
  classes: object.isRequired,
  tileData: arrayOf(object).isRequired,
  metaData: object.isRequired,
  pageCount: number.isRequired,
  handlePageChange: func.isRequired,
  refreshVoteData: func.isRequired,
  refreshFavourites: func.isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(ImageContainer);
