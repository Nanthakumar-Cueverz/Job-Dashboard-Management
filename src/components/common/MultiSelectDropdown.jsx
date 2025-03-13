import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const MultiSelectDropdown = ({
    options,
    selectedOptions,
    onChange,
    placeholder = 'Select options...',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        if (selectedOptions.find((item) => item.value === option.value)) {
            // If already selected, remove it
            onChange(selectedOptions.filter((item) => item.value !== option.value));
        } else {
            // If not selected, add it
            onChange([...selectedOptions, option]);
        }
    };

    return (
        <div className='relative'>
            <div
                className={`flex items-center justify-between w-full border-gray-300 bg-transparent border rounded-md py-2 px-3 cursor-pointer transition-all`}
                onClick={toggleDropdown}
            >
                <div className='flex flex-wrap gap-1'>
                    {selectedOptions.length === 0 ? (
                        <span className='text-gray-500'>{placeholder}</span>
                    ) : (
                        selectedOptions.map((item) => (
                            <span
                                key={item.value}
                                className='flex items-center gap-1 px-2 py-1 text-text-gray rounded-md text-sm '
                            >
                                {item.label},
                            </span>
                        ))
                    )}
                </div>
                <ChevronDown size={20} className='text-gray-500' />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className='absolute left-0 mt-2 w-full max-w-lg md:max-w-full shadow bg-white border border-border-primary rounded-lg z-10 p-2 overflow-y-auto max-h-40 md:max-h-52 flex flex-wrap gap-2'>
                    {options.map((option) => {
                        const isSelected = selectedOptions.find(
                            (item) => item.value === option.value,
                        );
                        return (
                            <div
                                key={option.value}
                                className={`px-4 py-2 text-sm md:text-base rounded-full border-border cursor-pointer transition-all border ${
                                    isSelected
                                        ? 'bg-primary-light text-primary border-primary'
                                        : 'text-gray-700 bg-gray-100 hover:bg-blue-50'
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
