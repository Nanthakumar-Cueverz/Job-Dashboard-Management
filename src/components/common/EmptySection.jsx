import React from 'react';
import empty from '@images/empty-icon.png';
import AddIcon from '@icons/plus.svg?react';
const EmptySection = ({title}) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center'>
                <img src={empty} alt='No Jobs' className='mb-4' />
                <p className='text-gray-700 font-medium'>{title}</p>
                <a href='/interviewai/create-job' className='btn-fill flex items-center gap-2 mt-3'>
                    <AddIcon />
                    Create One
                </a>
            </div>
        </div>
    );
};

export default EmptySection;
