import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import classNames from 'classnames';
import 'lazysizes';
import { func, object, shape, string } from 'prop-types';
import { useEffect } from 'react';
import URL from '../../constants/URL';
import { SUB_ID } from '../../constants/ImageContainer';
import usePost from '../../hooks/usePost';
import useDelete from '../../hooks/useDelete';
import ImageContainerFooter from './ImageContainerFooter';
import styles from './styles';

const ImageContainerTile = ({
  classes,
  tile,
  metaData = {},
  refreshVoteData,
  refreshFavourites
}) => {
  const setFavouriteApi = usePost(null);
  const deleteFavouriteApi = useDelete(null);

  const handleFavouriteClick = () => {
    if (metaData.favouriteId) {
      deleteFavouriteApi.setUrl(
        URL.removeFavourite.replace(/{.*}/, metaData.favouriteId)
      );
    } else {
      setFavouriteApi.setUrl({
        path: URL.setFavourite,
        data: {
          image_id: tile.id,
          sub_id: SUB_ID
        }
      });
    }
  };

  useEffect(() => {
    if (setFavouriteApi.data?.response || deleteFavouriteApi.data?.response) {
      refreshFavourites(`${URL.getFavourite}?sub_id=${SUB_ID}`);
    }
  }, [setFavouriteApi.data, deleteFavouriteApi.data, refreshFavourites]);

  useEffect(() => {
    if (setFavouriteApi.error || deleteFavouriteApi.error) {
      alert(
        setFavouriteApi.error?.response?.data?.message || 'Set Favourite failed'
      );
    }
  }, [setFavouriteApi.error, deleteFavouriteApi.error]);

  return (
    <Card>
      <CardMedia
        className={classNames(classes.media, 'lazyload')}
        image={tile.url}
        title={tile.id}
        data-sizes="auto"
        data-src={tile.url}
      />
      <GridListTileBar
        title={tile.id}
        titlePosition="top"
        actionIcon={
          setFavouriteApi.isLoading || deleteFavouriteApi.isLoading ? (
            <CircularProgress disableShrink />
          ) : (
            <IconButton
              onClick={handleFavouriteClick}
              aria-label={`star ${tile.id}`}
              className={classes.icon}
            >
              {metaData.favouriteId ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )
        }
        actionPosition="left"
        className={classes.titleBar}
      />
      <ImageContainerFooter
        tile={tile}
        metaData={metaData}
        refreshVoteData={refreshVoteData}
      />
    </Card>
  );
};

ImageContainerTile.propTypes = {
  classes: object.isRequired,
  metaData: object,
  refreshVoteData: func.isRequired,
  refreshFavourites: func.isRequired,
  tile: shape({
    img: string,
    title: string
  }).isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(
  ImageContainerTile
);
