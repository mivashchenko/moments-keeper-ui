import {ReactNode} from "react";

type DayInputContainerProps = {
    children: ReactNode
}
export const PostInputContainer = ({children}: DayInputContainerProps) => {
    return <div className={'absolute bottom-[200px] left-0 right-0'}>
        <div className={'flex justify-center items-center h-full'}>{children}</div>
    </div>
}