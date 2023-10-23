import {useContext} from "react";
import {AuthContext} from "@/services/auth/authProvider.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
};