import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_CONTENT, APP_NAME } from '../../constants/AppRouter';
import styles from './styles';

const AppNav = ({ classes }) => {
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab(APP_CONTENT[location.pathname.replace(/^\//, '')]?.name || 'Home');
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    if (path) {
      history.push(path);
    }
    setAnchorEl(null);
  };

  return (
    <section className={classes.root}>
      <div className={classes.title}>{APP_NAME}</div>
      <div className={classes.tab}>{tab}</div>
      <Button
        className={classes.menuButton}
        startIcon={<MenuIcon />}
        onClick={handleClick}
      />
      <Menu
        data-testid="app-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(APP_CONTENT).map((id) => (
          <MenuItem
            onClick={() => handleClose(APP_CONTENT[id].path)}
            key={`menu-button-${id}`}
          >
            <ListItemIcon className={classes.listItemIcon}>
              {APP_CONTENT[id].icon}
            </ListItemIcon>
            <ListItemText
              primary={APP_CONTENT[id].name}
              className={classes.listItemText}
            />
          </MenuItem>
        ))}
      </Menu>
    </section>
  );
};

AppNav.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles, { name: 'AppNav' })(AppNav);
