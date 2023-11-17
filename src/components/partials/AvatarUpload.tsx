import React, {useEffect, useRef, useState} from 'react';
import {Button, Typography} from '@mui/material';
import {useActions} from '../hooks/useActions';
import {useAppSelector} from '../hooks';

export const AvatarUpload = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const imageRef = useRef<any>();
    const {updatePicture} = useActions();
    const {user} = useAppSelector((state) => state.user);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setAvatar(URL.createObjectURL(file));

            if (user && user._id) {
                const formData = new FormData();
                formData.append('picture', file);
                updatePicture({userId: user._id, data: formData});
            }
        }
    };
    const handleFileRemove = () => {
        setAvatar(null);
        imageRef.current.value = '';
        updatePicture({userId: user._id, data: null});
    };

    const renderUpload = () => {
        return <div className="rounded-full flex justify-center items-center w-32 h-32 object-cover bg-gray-500 dark:bg-gray-700">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
        </div>;
    };

    useEffect(() => {
        if (user && user.picture) {
            setAvatar(`${process.env.REACT_APP_API_BASE_URL}${user.picture.replace('/', '')}`);
        }
    }, []);

    return <div className="grid justify-center gap-2">
        <label htmlFor="image" className="cursor-pointer">
            {avatar ? <img crossOrigin="anonymous" src={avatar} alt="Uploaded Avatar" className="rounded-full w-32 h-32 object-cover bg-gray-500 dark:bg-gray-700" /> : renderUpload()}

            <input id="image" ref={imageRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
        {avatar && <Button variant="text" onClick={handleFileRemove}><Typography fontSize="small">Видалити</Typography></Button>}
    </div>;
}

