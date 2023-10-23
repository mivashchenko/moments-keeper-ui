import {useAuth} from "@/services/auth";
import {Link, Navigate, Outlet} from "react-router-dom";
export const HomeLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/view" />;
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
            </nav>
            <Outlet />
        </div>
    )
};