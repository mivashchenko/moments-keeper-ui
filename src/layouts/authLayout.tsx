import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import {AuthProvider} from "@/services/auth";
import {UserType} from "@/services/auth/authProvider.tsx";

export const AuthLayout = () => {
    const outlet = useOutlet();
    const data = useLoaderData() as {userPromise: UserType};

    return (
        <Suspense fallback={<div>Progress...</div>}>
            <Await
                resolve={data.userPromise}
                errorElement={<div>Something went wrong!</div>}
                children={(user) => (
                    <AuthProvider userData={user}>{outlet}</AuthProvider>
                )}
            />
        </Suspense>
    );
};