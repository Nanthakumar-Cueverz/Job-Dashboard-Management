import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectMenu = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
}) => {
    return (
        <div className={`relative  max-w-full ${className}`}>
            <label className='mb-2 block text-base font-medium text-black'>Job Type</label>
            <select
                className='w-full bg-transparent border-border-primary rounded-md border border-stroke  py-[10px] px-5  outline-none transition'
                value={value}
                onChange={onChange}
            >
                <option value='' disabled hidden>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectMenu;
