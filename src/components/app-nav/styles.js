import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    background: grey[300]
  },
  title: {
    padding: '1rem 2rem',
    fontSize: '2rem',
    fontFamily: 'Roboto',
    fontWeight: '600',
    lineHeight: '2rem',
    letterSpacing: '0.1rem',
    textTransform: 'uppercase'
  },
  tab: {
    padding: '1rem 2rem',
    fontSize: '1.5rem',
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: '2rem',
    letterSpacing: '0.1rem',
    textTransform: 'uppercase'
  },
  menuButton: {
    '&: hover': {
      borderRadius: 0
    }
  },
  listItemIcon: {
    minWidth: '4rem'
  },
  listItemText: {
    '& > span': {
      fontSize: '1.4rem'
    }
  }
});

export default styles;
