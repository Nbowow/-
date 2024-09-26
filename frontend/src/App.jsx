import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Ranking from "./pages/Ranking";
function App() {
    return (
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/post" element={<PostRecipe />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/ranking" element={<Ranking />} />
                    {/* 다른 Route 추가 */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
