import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from "react-router-dom";
import './App.scss';
import {SignUpPage} from "./pages/sign_up";
import {HomePage} from "./pages/home";
import {LoginPage} from "./pages/login";
import {ProtectedLayout} from "./layouts/protectedLayout";
import {AuthLayout} from "./layouts/authLayout";
import AuthCallback from "@/pages/google_auth_callback/GoogleAuthCallback.tsx";

const getUserData = () => {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:5555/auth/user',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
        if (res.status === 500) {
            window.localStorage.removeItem('user');
            return null;
        }
        return res.json();
    }).catch(err => {
        console.log(err);
        // throw new Error('Something went wrong!');
        return null;
    });
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout/>}
               loader={() => defer({userPromise: getUserData()})}
               errorElement={<div>Error</div>}
        >
            <Route>
                {/*<Route element={<HomeLayout/>}>*/}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/auth/google/callback" element={<AuthCallback/>}/>
            </Route>

            <Route path="/view" element={<ProtectedLayout/>}>
                {/*<Route path="month" element={<ViewMonth/>}/>*/}
                <Route path="profile" element={<div>Profile</div>}/>
                <Route path="settings" element={<div>Settings</div>}/>
                {/*<Route path="calendar" element={<RoundCalendarPage/>}/>*/}
            </Route>
        </Route>
    )
)
