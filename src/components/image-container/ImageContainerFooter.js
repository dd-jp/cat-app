import { withStyles } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CircularProgress from '@material-ui/core/CircularProgress';
import { object, shape, string, func } from 'prop-types';
import { useEffect } from 'react';
import { DISLIKE, LIKE, SUB_ID } from '../../constants/ImageContainer';
import URL from '../../constants/URL';
import useApi from '../../hooks/useApi';
import styles from './styles';
import {
  getDefaultOptions,
  postDefaultOptions
} from '../../hooks/defaultOptions';

const ImageContainerFooter = ({
  classes,
  tile,
  metaData = {},
  refreshVoteData
}) => {
  const createVoteApi = useApi(null);

  const handleClick = (type) => {
    createVoteApi.setRequest({
      url: URL.createVote,
      options: {
        ...postDefaultOptions,
        data: {
          image_id: tile.id,
          sub_id: SUB_ID,
          value: type
        }
      }
    });
  };

  useEffect(() => {
    if (createVoteApi.response?.data) {
      refreshVoteData({
        url: `${URL.getVotes}?sub_id=${SUB_ID}`,
        options: { ...getDefaultOptions }
      });
      // TODO Add snackBar to display image, use Redux and reuse a single snack bar for whole app
      alert(createVoteApi.response.data.message);
    }
    // eslint-disable-next-line
  }, [createVoteApi.response]);

  useEffect(() => {
    if (createVoteApi.error) {
      // TODO Add snackBar to display image, use Redux and reuse a single snack bar for whole app
      alert(createVoteApi.error);
    }
  }, [createVoteApi.error]);

  return (
    <div className={classes.cardContentContainer}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="h2"
          className={classes.score}
        >
          Score: {metaData?.like - metaData?.dislike || 0}
        </Typography>
      </CardContent>
      {createVoteApi.isLoading ? (
        <CircularProgress disableShrink />
      ) : (
        <CardActions>
          <IconButton aria-label="like" onClick={() => handleClick(LIKE)}>
            <ThumbUpAltIcon />
            <span style={{ paddingLeft: '0.5rem' }}>{metaData?.like}</span>
          </IconButton>
          <IconButton aria-label="dislike" onClick={() => handleClick(DISLIKE)}>
            <ThumbDownIcon />
            <span style={{ paddingLeft: '0.5rem' }}>{metaData?.dislike}</span>
          </IconButton>
        </CardActions>
      )}
    </div>
  );
};

ImageContainerFooter.propTypes = {
  classes: object.isRequired,
  metaData: object,
  refreshVoteData: func.isRequired,
  tile: shape({
    img: string,
    title: string
  }).isRequired
};

export default withStyles(styles, { name: 'ImageContainer' })(
  ImageContainerFooter
);
