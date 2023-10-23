import {LoginPageLayout} from "./layout";
import {SignInForm} from "./components/form";

export const LoginPage = () => {
    // const { sign_in } = useAuth();

    return (
        <LoginPageLayout>
            <SignInForm/>
        </LoginPageLayout>
    )
};
