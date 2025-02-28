import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder = 'Enter text...',
    disabled = false,
    required = false,
    className = '',
}) => {
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={name} className='mb-2 block text-base font-medium text-black'>
                    {label}
                </label>
            )}
            <div className='relative'>
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`w-full bg-transparent border-border-primary rounded-md border border-stroke  py-[10px] px-5  outline-none transition ${className}`}
                />
            </div>
        </div>
    );
};

export default Input;
