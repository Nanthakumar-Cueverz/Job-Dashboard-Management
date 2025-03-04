import React from 'react';

const PostJobCommon = ({ url }) => {
    return (
        <div className='w-full flex justify-end items-center'>
            <a href={url} className='btn-fill px-10'>
                Post a Job
            </a>
        </div>
    );
};

export default PostJobCommon;
