import React, { useState } from 'react';
import Eye from '@icons/eye.svg?react';
import EyeOff from '@icons/eye-off.svg?react';
const PasswordInput = ({
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
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    return (
        <div className='relative w-full'>
            {label && (
                <label htmlFor={name} className='mb-2 block text-base font-medium text-black'>
                    {label}
                </label>
            )}
            <div className='relative'>
                <input
                    id={name}
                    type={isPassword && showPassword ? 'text' : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`w-full bg-transparent border-border-primary rounded-md border border-stroke  py-[10px] px-5  outline-none transition ${className} pr-12`}
                />
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-1/2 right-4 -translate-y-1/2'
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
