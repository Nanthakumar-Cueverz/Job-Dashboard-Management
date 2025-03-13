import React, { useState } from 'react';
import JobDetailsForm from '../components/ui/JobDetailsForm';
import { toast } from 'react-hot-toast';
import { Check } from 'lucide-react';
const EditJobDetails = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        selectedOptions: [],
    });
    return (
        <div className='max-w-3xl mx-auto py-5 md:py-5'>
            <h2 className='text-subtext-primary text-lg font-semibold pb-5'>Software Engineer</h2>
            <JobDetailsForm formData={formData} setFormData={setFormData} />
            <div className='py-10 text-end'>
                <button className='modal-btn-outline border-0 px-16'>Cancel</button>
                <button
                    className='btn-fill'
                    onClick={() => {
                        toast.custom(
                            (t) => (
                                <div className='bg-green-200 text-primary-green px-5 flex font-semibold items-center rounded-md whitespace-nowrap text-xs py-3'>
                                    <Check className='bg-primary-green text-white rounded-full p-0.5 mr-2 h-4 w-4 stroke-3' />
                                    The job has been Updated successfully.
                                </div>
                            ),
                            {
                                duration: 5000,
                            },
                        );
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditJobDetails;
