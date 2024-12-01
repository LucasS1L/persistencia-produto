import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router.tsx";
import GlobalStyle from "./Style/GlobalStyle.ts";
import ThemeProvider from "./Style/Themes/ThemeProvider.tsx";
import {theme} from "./Style/Themes/theme.ts";
function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalStyle/>

                    <Router/>

            </BrowserRouter>
        </ThemeProvider>
    </>
  )
}

export default App
