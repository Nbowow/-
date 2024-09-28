import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Notfound from "./pages/Notfound/Notfound";
import Main from "./pages/Main/Main";
import Ranking from "./pages/Ranking";
import UserProfile from "./components/UserProfile/UserProfile";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/post" element={<PostRecipe />} />
                        <Route path="/recipe" element={<Recipe />} />
                        <Route path="/recipe/:id" element={<RecipeDetail />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
