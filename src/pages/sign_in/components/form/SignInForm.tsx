import {FormEvent, useState} from "react";
import GoogleIcon from './../../../../assets/icons/google.svg?react';
import axiosClient from "@/axios.ts";
import {Button, Input, SvgIcon} from "@mui/material";
// import {useAuth} from "@/services/auth";
import {useNavigate} from "react-router-dom";
import * as React from "react";


type AuthData = {
    email: string,
    password: string,
    name: string,
}

export const SignInForm = () => {

    const [signUpFormData, setSignUpFormData] = useState<AuthData>({} as AuthData);
    // const {login} = useAuth();
    const navigate = useNavigate();

    const updateAuthData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpFormData({
            ...signUpFormData,
            [e.target.name]: e.target.value
        })
    }

    const googleSignup = () => {
        axiosClient.post('auth/google').then((response) => {
            if (response.status === 200) {
                window.location.href = response?.data?.redirectUrl;
            } else {
                console.log(response);
            }
        })
    }

    const signIn = async (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const response = await axiosClient.post('auth/sign-in', {
            email: signUpFormData.email,
            password: signUpFormData.password,
        })
        if (response.status === 200) {
            window.localStorage.setItem('token', response.data.token);
        }
        navigate(0)
    }

    return (
        <div>
            <div>
                <h2 className={'text-[24px] font-bold mb-[18px] text-center'}>Sign in</h2>
                <form onSubmit={signIn} className={'w-[320px]'}>
                    <div className={'mb-[18px]'}>
                        <Input type="text" name="email" placeholder={'Enter your email'} onChange={updateAuthData}/>
                    </div>

                    <div className={'mb-[18px]'}>
                        <Input type="password" name="password" placeholder={'Enter your password'}
                               onChange={updateAuthData}/>
                    </div>

                    <Button type={'submit'}>Continue</Button>

                    <div className={'flex items-center justify-between w-[320px] text-center h-[60px]'}>
                        <div className={'top-[15px] w-[130px] h-[1px] bg-[#808080]'}></div>
                        <p className={'m-auto'}>or</p>
                        <div className={'top-[15px] w-[130px] h-[1px] bg-[#808080]'}></div>
                    </div>

                    <Button
                        startIcon={<SvgIcon><GoogleIcon/></SvgIcon>}
                            onClick={googleSignup}>Sign
                        in with
                        Google</Button>
                </form>
            </div>
        </div>
    )
}



