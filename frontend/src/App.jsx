import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostRecipe from "./pages/PostRecipe";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/post" element={<PostRecipe />} />
                {/* 다른 Route 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
