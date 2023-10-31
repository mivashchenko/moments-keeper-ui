import {Input} from "@/components/ui/Input";

export const PostInput = () => {
    return <div className={'shadow-md max-w-[600px] w-full'}>
        <div><Input rows={6} multiline placeholder={'How was your day?'}/></div>
    </div>
}