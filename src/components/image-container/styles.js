const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    maxHeight: 'calc(100vh - 9rem)',
    height: 'auto',
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  },
  media: {
    height: 250
  },
  cardContentContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  score: {
    paddingTop: '0.8rem',
    fontSize: '2rem'
  },
  pagination: {
    padding: '1rem 0',
    position: 'fixed',
    bottom: 0
  }
});

export default styles;
