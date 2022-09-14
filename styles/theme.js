import { theme, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  ...theme,
  initialColorMode: 'light',
  useSystemColorMode: true,
  styles: {
    global: props => ({
      'html, body': {
        fontSize: 'md',
        color: props.colorMode === 'dark' ? 'white' : 'black.600',
        lineHeight: 'tall'
      },
      a: {
        color: props.colorMode === 'dark' ? 'black.500' : 'black.500'
      }
    })
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },

})

export default customTheme
