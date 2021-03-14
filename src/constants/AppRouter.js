import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const APP_CONTENT = Object.freeze({
  home: {
    id: 'home',
    name: 'Home',
    path: '/',
    icon: <HomeIcon fontSize="large" />,
    component: import('../pages/Home')
  },
  upload: {
    id: 'upload',
    name: 'Upload',
    path: '/upload',
    icon: <CloudUploadIcon fontSize="large" />,
    component: import('../pages/Upload')
  }
});

export default APP_CONTENT;
