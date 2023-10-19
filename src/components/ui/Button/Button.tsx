import {Button as ButtonBase, ButtonProps} from '@mui/base/Button';
import {SwitchOwnerState} from "@mui/base";
import {ReactComponentElement} from "react";


interface IButtonProps extends ButtonProps, React.HTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secondary';
    icon?: ReactComponentElement<any>;
};
export const Button = (props: IButtonProps) => {
    const types = {
        primary: 'bg-black text-[#ffffff]',
        secondary: 'bg-white border border-solid border-[#000000] text-[#000000]',
    }
    const {buttonType = 'primary', children, icon, ...restProps} = props;
    return <ButtonBase {...restProps} slotProps={{
        root: (ownerState: SwitchOwnerState) => {
            return {
                className: `w-full px-[25px] rounded-[15px] h-[60px] p-[10px_25px]text-[16px] font-bold ${
                    types[buttonType] || types.primary
                }`
            }
        }
    }}>
        {icon && <span className={'mr-[15px]'}>{icon}</span>}
        {children}
    </ButtonBase>
}