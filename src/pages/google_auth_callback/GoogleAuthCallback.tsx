import {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axiosClient from "@/axios.ts";

const AuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const {login} = useAuth();


    useEffect(() => {
        // Handle user sign_in success here
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        axiosClient.get(`auth/google/callback?code=${code}`).then((res) => {
            window.localStorage.setItem('token', res.data.token);
            navigate(0)
        })
    }, [location.search, navigate]);

    return (
        <div>Logging in...</div>
    );
};

export default AuthCallback;
