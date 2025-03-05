import React from 'react';

const TextArea = ({ label, placeholder, type, value, onChange }) => {
    return (
        <>
            <label className='mb-2 block text-base font-medium text-black'>{label}</label>
            <textarea
                rows='5'
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className='w-full bg-transparent border-border-primary rounded-md border border-stroke  py-[10px] px-5  outline-none transition'
            />
        </>
    );
};

export default TextArea;
