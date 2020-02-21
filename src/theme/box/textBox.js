import defaults from './defaults'

export const textBox = {
  container: {
    minHeight: 100,
    width: defaults.container.width,
    padding: 5,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#8a8b93',
    backgroundColor: '#dcdddc',

    display: 'flex',
    flexDirection: 'column',
  },
  textContainer: {
    width: defaults.container.width - 20,
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {
    color: '#8a8b93',
    fontWeight: 'bold',
    fontSize: 11,
  },
  clipboard: {
    alignSelf: 'flex-end',
    position: 'absolute'
  }
}