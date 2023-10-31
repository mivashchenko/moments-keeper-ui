import {ReactNode} from "react";

type AppLayoutProps = {
    children: ReactNode
}
export const AppLayout = ({children}: AppLayoutProps) => {
    return <div className={'container mx-auto h-[100vh]'}>
        <div className={'h-full flex flex-col'}>{children}</div>
    </div>
}