/* eslint-disable no-alert */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/userStore";
import { PropTypes } from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        alert("로그인이 필요한 서비스입니다.");
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
