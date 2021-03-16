import { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import URL from '../constants/URL';
import ImageContainer from '../components/image-container/ImageContainer';
import useApi from '../hooks/useApi';
import { MAX_IMAGES_PER_PAGE, SUB_ID } from '../constants/ImageContainer';
import { getDefaultOptions } from '../hooks/defaultOptions';

const Home = () => {
  const getAllImages = useApi(null);
  const getVoteApi = useApi(null);
  const getFavouritesApi = useApi(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [tileData, setTileData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [head, setHead] = useState(0);
  const [metaData, setMetaData] = useState({});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  useEffect(() => {
    getVoteApi.setRequest({
      url: `${URL.getVotes}?sub_id=${SUB_ID}`,
      options: { ...getDefaultOptions }
    });
    getFavouritesApi.setRequest({
      url: `${URL.getFavourite}?sub_id=${SUB_ID}`,
      options: getDefaultOptions
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tileData && getVoteApi.response && getFavouritesApi.response) {
      getVoteApi.setRequest(null);
      getFavouritesApi.setRequest(null);

      setMetaData(
        tileData.reduce((acc, obj) => {
          const favourite = getFavouritesApi.data.response.find(
            (favObj) => favObj.image_id === obj.id
          );

          const liked = getVoteApi.data.response.find(
            (likeObj) => likeObj.image_id === obj.id
          );

          if (!acc[obj.id]) {
            acc[obj.id] = {
              like: 0,
              dislike: 0,
              favouriteId: undefined
            };
          }

          acc[obj.id] = {
            like:
              liked?.value === 1 ? (acc[obj.id].like += 1) : acc[obj.id].like,
            dislike:
              liked?.value === 0
                ? (acc[obj.id].dislike += 1)
                : acc[obj.id].dislike,
            favouriteId: favourite?.id
          };

          return acc;
        }, {})
      );
    }
    // eslint-disable-next-line
  }, [getVoteApi.response, getFavouritesApi.response, tileData]);

  useEffect(() => {
    getAllImages.setRequest({
      url: `${URL.getUploadedImages}?limit=${MAX_IMAGES_PER_PAGE}&page=${head}&order=ASC`,
      options: {
        ...getDefaultOptions
      }
    });
    // eslint-disable-next-line
  }, [head]);

  useEffect(() => {
    if (getAllImages.response?.data) {
      setTileData(getAllImages.response.data);
      if (pageCount < 1) {
        setPageCount(
          Math.ceil(
            getAllImages.response.headers['pagination-count'] /
              MAX_IMAGES_PER_PAGE
          )
        );
      }
    }
    // eslint-disable-next-line
  }, [getAllImages.response]);

  useEffect(() => {
    if (getVoteApi.error || getFavouritesApi.error || getAllImages.error) {
      setToastOpen(true);
    }
    // eslint-disable-next-line
  }, [getVoteApi.error, getFavouritesApi.error, getAllImages.error]);

  return (
    <div className="content-container">
      <ImageContainer
        tileData={tileData}
        metaData={metaData}
        refreshVoteData={getVoteApi.setRequest}
        refreshFavourites={getFavouritesApi.setRequest}
        pageCount={pageCount}
        handlePageChange={(e, n) => setHead(n - 1)}
      />
      {(getAllImages.isLoading || getVoteApi.isLoading) && (
        <div className="app-info-container">
          <CircularProgress disableShrink />
        </div>
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
          {getVoteApi.error?.response?.data?.message ||
            getAllImages.error?.response?.data?.message ||
            'Failed to Load Images'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
