import {PostInputContainer} from "@/pages/day/components";
import {PostInput} from "@/components/post_input";

export const DayPage = () => {
    return <div className={'relative flex-1'}>
        <PostInputContainer>
            <PostInput />
        </PostInputContainer>
    </div>
}