import {Input as InputBase} from '@mui/base/Input';

export const Input = (props) => {
    return (
        <InputBase {...props} slotProps={{
            input: {
                className: "w-full bg-white rounded-[15px] h-[60px] p-[10px_25px] placeholder:color-[#BFBFBF] text-[#000000] text-[16px] border border-solid border-[#BFBFBF] outline-[none] focus:outline-[none] focus:border-[1px_solid_#BFBFBF]"
            }
        }} />
    );
}