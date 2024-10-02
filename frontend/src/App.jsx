import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import Notfound from "./pages/Notfound/Notfound";
import Main from "./pages/Main/Main";
import Ranking from "./pages/Ranking";
import UserProfile from "./components/UserProfile/UserProfile";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import MyPage from "./pages/MyPage/MyPage";
import Ingredient from "./pages/Ingredient/Ingredient";
import ModifyProfile from "./pages/ModifyProfile/ModifyProfile";
import SearchRecipe from "./pages/SerachRecipe";

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
                        <Route path="/modify" element={<ModifyProfile />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/ingredient" element={<Ingredient />} />
                        <Route path="/search" element={<SearchRecipe />} />
                        <Route path="*" element={<Notfound />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
