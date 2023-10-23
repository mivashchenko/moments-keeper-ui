import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@/services/auth";
// import {useSelector} from "react-redux";

export const ProtectedLayout = () => {
    const {user} = useAuth();

    // const data = useSelector((state) => state.user.data);
    if (!user) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <nav>
                <Link to="/view/month">Month</Link>
                <Link to="/view/settings">Settings</Link>
                <Link to="/view/profile">Profile</Link>
                <Link to="/view/calendar">Calendar</Link>
            </nav>
            <Outlet/>
        </div>
    )
};