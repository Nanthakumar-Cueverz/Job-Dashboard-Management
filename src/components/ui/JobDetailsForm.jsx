import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import SelectMenu from '../common/SelectMenu';

const JobDetailsForm = ({ formData, setFormData, title }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
    ];
    const jobRoles = [
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'remote', label: 'Remote' },
        { value: 'hybrid', label: 'Hybrid' },
    ];
    return (
        <div>
            <h1 className='mb-2 block text-base font-medium text-black'>{title}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 border border-border-primary rounded-md p-5 '>
                <Input
                    label='Job Title'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder='Enter Job Title'
                />
                <Input
                    label='Company Name'
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder='Enter Company Name'
                />
                <Input
                    label='Location'
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder='Select Location'
                />
                <SelectMenu
                    options={jobRoles}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    placeholder='Choose a role...'
                />
                <div className='col-span-1 md:col-span-2'>
                    <label htmlFor='' className='mb-2 block text-base font-medium text-black'>
                        Keywords
                    </label>
                    <MultiSelectDropdown
                        options={options}
                        selectedOptions={formData.selectedOptions}
                        onChange={(selected) =>
                            setFormData({ ...formData, selectedOptions: selected })
                        }
                        placeholder='Choose a framework...'
                    />
                </div>
                <div className='col-span-1 md:col-span-2'>
                    <TextArea
                        label='Job Description'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder='Enter Job Description'
                    />
                </div>
            </div>
        </div>
    );
};

export default JobDetailsForm;
