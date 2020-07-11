export const modal = {
  presenter: {
    container: {
      // TODO: palceholder minHeight until we get the real val
      $xsmall: {
        minHeight: 100,
        maxHeight: 500,
      },
      $small: {
        maxHeight: 772,
      },
    },
    header: {
      container: {
        flexDirection: 'row',
        // TODO: placeholder until we know how the passed down css/styling will work
        backgroundColor: '#02b4a3',
        height: 72,
      },
      title: {
        $xsmall: {
          alignSelf: 'center',
          color: 'white',
          paddingLeft: 46,
          paddingRight: 30,
          fontWeight: '600',
          fontSize: 19,
        },
        $small: {
          fontSize: 22,
        },
      },
      closeButton: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        right: '4%',
      },
    },
    content: {
      header: {
        container: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 20,
          flexShrink: 1,
        },
        image: {
          // TODO: placeholder values until we get more detail on images
          $xsmall: {
            width: 80,
            height: 80,
            overflow: 'hidden',
            borderRadius: 80 / 2,
            marginVertical: 20,
          },
          $small: {
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
          },
        },
        title: {
          $xsmall: {
            fontSize: 22,
            fontWeight: '500',
            // TODO: update placeholder color
            color: '#A0A0A0',
          },
          $small: {
            fontSize: 25,
          },
        },
        company: {
          $xsmall: {
            fontSize: 12,
          },
          $small: {
            fontSize: 16,
          },
        },
      },

      description: {
        style: {
          marginBottom: 50,
          borderColor: '#F0F0F0',
          borderWidth: '1px',
        },
        contentContainerStyle: {
          $small: {
            maxHeight: 220,
            paddingRight: 21,
            paddingLeft: 15,
            paddingTop: 18,
            paddingBottom: 18,
          },
          $medium: {
            maxHeight: 450,
            paddingRight: 41,
            paddingLeft: 26,
            paddingTop: 23,
            paddingBottom: 23,
          },
        },
      },
    },
  },
}
