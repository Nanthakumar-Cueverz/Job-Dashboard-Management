import React from 'react';

const RadioGroup = ({ label, options = [], name, selectedValue, onChange, className }) => {
    return (
        <div>
            <ul className={`space-y-3 flex space-x-5 ${className}`}>
                {options.map((item, idx) => {
                    const id = `${name}-${idx}`;
                    return (
                        <li key={id} className='flex items-center gap-x-2.5 mb-0 whitespace-nowrap'>
                            <input
                                type='radio'
                                id={id}
                                name={name}
                                value={item}
                                className='form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150'
                                checked={selectedValue === item}
                                onChange={() => onChange(item)}
                            />
                            <label
                                htmlFor={id}
                                className='text-sm text-table-text font-normal whitespace-nowrap'
                            >
                                {item}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RadioGroup;
