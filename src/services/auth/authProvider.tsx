import {createContext, ReactNode, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";
import {setUser} from "@/store/reducers/userReducer.ts";
import {useDispatch} from "react-redux";


export type UserType = {
    email: string,
    username: string,
    token: string,
}

type AuthContextType = {
    user: UserType,
    login: (user: UserType) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
    children: ReactNode[],
    userData: UserType,
}

export const AuthProvider = ({children, userData}: AuthProviderProps) => {
    const [user, setLocalStorageUser] = useLocalStorage("user", userData);
    const dispatch = useDispatch();
    dispatch(setUser(user))

    const navigate = useNavigate();


    const login = async (data: UserType) => {
        setLocalStorageUser(data);
        dispatch(setUser(user))
        navigate("/view/profile", {replace: true});
    };

    const logout = () => {
        setLocalStorageUser(null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        navigate("/", {replace: true});
    };

    const parseJwt = (token: string | null) => {
        if (!token) {
            return;
        }
        if (token === 'undefined') {
            return;
        }
        const decode = JSON.parse(atob(token.split('.')[1]));
        // console.log(decode);
        if (decode.exp * 1000 < new Date().getTime()) {
            logout();
            console.log('Time Expired');
        }
    };

    parseJwt(window.localStorage.getItem('token'));

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

