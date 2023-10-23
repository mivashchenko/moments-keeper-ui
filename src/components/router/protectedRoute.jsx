import { Navigate } from "react-router-dom";
import {useAuth} from "src/services/auth";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};