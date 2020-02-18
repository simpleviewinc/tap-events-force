const modalWidth = 300

export const modal = {
  view: {
    zIndex: 100000,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 30,
    margin: 10,
    height: 200,
    width: modalWidth,

    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    maxWidth: modalWidth / 1.1,
  }
}