import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const APP_NAME = 'CATS';

export const APP_CONTENT = Object.freeze({
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

export const API_KEY = '7af93c2c-1819-4f22-b908-0343b7c07010';
