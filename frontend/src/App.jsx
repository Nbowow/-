import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Notfound from "./pages/Notfound/Notfound";
import Main from "./pages/Main/Main";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/post" element={<PostRecipe />} />
                        <Route path="/recipe" element={<Recipe />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
