import {useState} from "react";
import {Input} from "@/components/ui/Input";
import GoogleIcon from './../../../../assets/icons/google.svg?react';
import axiosClient from "@/axios.ts";
import {SvgIcon} from "@mui/material";
import {Button} from "@/components/ui/Button";


type AuthData = {
    email: string,
    password: string,
    name: string,
}

export const SignUpForm = () => {

    const [authData, setAuthData] = useState<AuthData>({} as AuthData);

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const updateAuthData = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }

    const googleSignup = () => {
        axiosClient.post('auth/google').then((response) => {
            if (response.status === 200) {
                console.log(response?.data?.redirectUrl);
                window.location.href = response?.data?.redirectUrl;
            } else {
                console.log(response);
            }
        })
    }

    return (
        <div>
            <div>
                <h2 className={'text-[24px] font-bold mb-[18px] text-center'}>Sign up</h2>
                <form className={'w-[320px]'}>
                    <div className={'mb-[18px]'}>
                        <Input type="text" name="email" placeholder={'Enter your email'} onChange={updateAuthData}/>
                    </div>
                    <div className={'mb-[18px]'}>
                        <Input type="password" name="password" placeholder={'Enter your password'}
                               onChange={updateAuthData}/>
                    </div>
                    <div className={'mb-[18px]'}>
                        <Input type="password" name="passwordConfirm" placeholder={'Confirm your password'}
                               onChange={updateAuthData}/>
                    </div>

                    <Button>Continue</Button>

                    <div className={'flex items-center justify-between w-[320px] text-center h-[60px]'}>
                        <div className={'top-[15px] w-[130px] h-[1px] bg-[#808080]'}></div>
                        <p className={'m-auto'}>or</p>
                        <div className={'top-[15px] w-[130px] h-[1px] bg-[#808080]'}></div>
                    </div>

                    <Button buttonType={'secondary'}
                            icon={<SvgIcon><GoogleIcon/></SvgIcon>}
                            onClick={googleSignup}>Sign
                        in with
                        Google</Button>
                </form>
            </div>
        </div>
    )
}



