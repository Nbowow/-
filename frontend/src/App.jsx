import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Notfound from "./pages/Notfound/Notfound";
import Ranking from "./pages/Ranking";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/post" element={<PostRecipe />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<Notfound />} />
                    {/* 다른 Route 추가 */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
