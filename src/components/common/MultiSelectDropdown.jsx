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
                <div className='absolute left-0 mt-2 flex h-36  w-full shadow bg-white border border-border-primary rounded-lg  z-10 max-h-40 overflow-y-auto p-2'>
                    {options.map((option) => {
                        const isSelected = selectedOptions.find(
                            (item) => item.value === option.value,
                        );
                        return (
                            <div
                                key={option.value}
                                className={`px-6 py-2 m-1 h-fit rounded-full bg-table-background border border-border-primary cursor-pointer transition-all ${
                                    isSelected
                                        ? 'text-primary border border-primary'
                                        : 'text-gray-700 hover:bg-blue-50'
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
