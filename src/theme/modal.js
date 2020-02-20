import { modal as defaults } from './defaults'

export const modal = {
  view: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 30,
    height: 200,
    width: defaults.width,

    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',

    overflow: 'hidden'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    flexWrap: 'wrap',
  },
  button: {
    margin: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
    flexWrap: 'wrap',
    maxWidth: defaults.width / 1.1,
  }
}