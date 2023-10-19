import React from "react";
import {LoginPageLayout} from "./layout";
import {LoginForm} from "./components/form";

export const LoginPage = (props) => {
    // const { login } = useAuth();

    return (
        <LoginPageLayout>
            <LoginForm/>
        </LoginPageLayout>
    )
};
