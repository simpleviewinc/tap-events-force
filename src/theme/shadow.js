const boxShadow = {
  elevation: 5, // android
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0.5 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
}

export const shadow = {
  box: boxShadow,
  circle: {
    ...boxShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    borderRadius: 50,
  },
  popup: {
    ...boxShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
}
