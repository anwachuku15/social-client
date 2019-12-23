export default {
  palette: {
    common: {black: "#000", white: "#fff" },
    background: {paper: 'whitesmoke', default: "white"},
    secondary: {light: "#ff4081", main: "#f50057", dark: "#c51162", contrastText: "#fff"},
    // primary: {light: "#4d5eff",main:"#0018ff",dark:"#0013ce",contrastText:"#fff"},
    // primary: {main: 'rgba(5, 5, 5, 1)'},
    primary: {main: '#06d4cd', contrastText: '#fff'},
    error: {light: "#ff4242", main:"#ff0000",dark:"#c50000",contrastText:"#fff"},
    text: {primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}
    // text: {primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}
  },
  typography: {
    userNextVariants: true
  },

  spreadThis: {
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 20px auto',
      maxWidth: 75
    },
    pageTitle: {
      margin: '10px auto 10px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    progress: {
      position: 'absolute'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    }
  },

}