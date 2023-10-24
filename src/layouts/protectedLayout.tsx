import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@/services/auth";
import {Container} from "@mui/material";
// import {useSelector} from "react-redux";

export const ProtectedLayout = () => {
    const {user} = useAuth();

    // const data = useSelector((state) => state.user.data);
    if (!user) {
        return <Navigate to="/"/>;
    }

    return (
        <Container maxWidth={false} sx={{height: '100vh'}}>
            <nav>
                <Link to="/view/day">Day view</Link>
                <Link to="/view/settings">Settings</Link>
                <Link to="/view/profile">Profile</Link>
                <Link to="/view/calendar">Calendar</Link>
            </nav>
            <Outlet/>
        </Container>
    )
};