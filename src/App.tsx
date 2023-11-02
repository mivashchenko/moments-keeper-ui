import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from "react-router-dom";
import './App.scss';
import {SignUpPage} from "./pages/sign_up";
import {HomePage} from "./pages/home";
import {LoginPage} from "./pages/sign_in";
import {ProtectedLayout} from "./layouts/protectedLayout";
import {AuthLayout} from "./layouts/authLayout";
import AuthCallback from "@/pages/google_auth_callback/GoogleAuthCallback.tsx";
import {HomeLayout} from "@/layouts/homeLayout.tsx";
import axiosClient from "@/axios.ts";
import {Profile} from "@/pages/profile/Profile.tsx";
import {TimelinePage} from "src/pages/timeline";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import dayjs from "dayjs";
import objectSupportPlugin from "dayjs/plugin/objectSupport";
import durationPlugin from "dayjs/plugin/duration";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import utcPlugin from "dayjs/plugin/utc";
import weekdayPlugin from "dayjs/plugin/weekday";

dayjs.extend(objectSupportPlugin);
dayjs.extend(durationPlugin);
dayjs.extend(isBetweenPlugin);
dayjs.extend(localizedFormatPlugin);
dayjs.extend(relativeTimePlugin);
dayjs.extend(utcPlugin);
dayjs.extend(customParseFormat);
dayjs.extend(weekdayPlugin);

const getUserData = async () => {
    return await axiosClient.post('auth/user').then(res => {
        if (res.status === 500) {
            window.localStorage.removeItem('user');
            return null;
        }
        return res.data;
    }).catch(() => {
        return null;
    });
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout/>}
               loader={() => defer({userPromise: getUserData()})}
               errorElement={<div>Error</div>}
        >
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signin" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/auth/google/callback" element={<AuthCallback/>}/>
            </Route>

            <Route path="/view" element={<ProtectedLayout/>}>
                <Route path="timeline" element={<TimelinePage/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="settings" element={<div>Settings</div>}/>
                {/*<Route path="calendar" element={<RoundCalendarPage/>}/>*/}
            </Route>
        </Route>
    )
)
