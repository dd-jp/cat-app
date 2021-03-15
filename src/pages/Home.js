import { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import URL from '../constants/URL';
import ImageContainer from '../components/image-container/ImageContainer';
import useGet from '../hooks/useGet';
import { MAX_IMAGES_PER_PAGE, SUB_ID } from '../constants/ImageContainer';

const Home = () => {
  const getAllImages = useGet(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [tileData, setTileData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [head, setHead] = useState(0);
  const [metaData, setMetaData] = useState({});
  const getVoteApi = useGet(null);
  const getFavouritesApi = useGet(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  useEffect(() => {
    getVoteApi.setUrl(`${URL.getVotes}?sub_id=${SUB_ID}`);
    getFavouritesApi.setUrl(`${URL.getFavourite}?sub_id=${SUB_ID}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getVoteApi.data?.response && getFavouritesApi.data?.response) {
      getVoteApi.setUrl(null);
      getFavouritesApi.setUrl(null);

      setMetaData(
        getVoteApi.data.response.reduce((acc, obj) => {
          const favourite = getFavouritesApi.data.response.find(
            (favObj) => favObj.image_id === obj.image_id
          );

          if (!acc[obj.image_id]) {
            acc[obj.image_id] = {
              like: 0,
              dislike: 0,
              favouriteId: favourite?.id
            };
          }

          acc[obj.image_id] = {
            like:
              obj.value === 1
                ? (acc[obj.image_id].like += 1)
                : acc[obj.image_id].like,
            dislike:
              obj.value === 0
                ? (acc[obj.image_id].dislike += 1)
                : acc[obj.image_id].dislike,
            favouriteId: favourite?.id
          };
          return acc;
        }, {})
      );
    }
    // eslint-disable-next-line
  }, [getVoteApi.data, getFavouritesApi.data]);

  useEffect(() => {
    getAllImages.setUrl(
      `${URL.getUploadedImages}?limit=${MAX_IMAGES_PER_PAGE}&page=${head}&order=ASC`
    );
    // eslint-disable-next-line
  }, [head]);

  useEffect(() => {
    if (getAllImages.data?.response) {
      setTileData(getAllImages.data.response);
      if (pageCount < 1) {
        setPageCount(
          Math.ceil(
            getAllImages.data.headers['pagination-count'] / MAX_IMAGES_PER_PAGE
          )
        );
      }
    }
    // eslint-disable-next-line
  }, [getAllImages.data]);

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
        refreshVoteData={getVoteApi.setUrl}
        refreshFavourites={getFavouritesApi.setUrl}
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
