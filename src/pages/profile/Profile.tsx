import {useAuth} from "@/services/auth";

export const Profile = () => {
    const {logout} = useAuth()
    const handleLogout = () => {
        logout();
    }
    return <div>
        <button onClick={handleLogout}>Logout</button>
        <div>Profile</div>
    </div>
}