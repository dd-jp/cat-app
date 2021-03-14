import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgba(0, 0, 0, 0.87)',
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
