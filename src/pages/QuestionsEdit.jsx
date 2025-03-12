import React from 'react';
import CandidateQuestions from '../components/ui/CandidateQuestions';
import { Pencil, HardDriveUpload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
const QuestionsEdit = () => {
    const navigate = useNavigate();
    return (
        <div className='max-w-4xl mx-auto'>
            <div className=''>
                <div className=''>
                    <h2>Data Scientist Questions</h2>
                </div>
                <div className='bg-table-background rounded-md'>
                    <CandidateQuestions
                        classNameInner='bg-white '
                        checkBox='block'
                        ListNumbers='hidden'
                    />
                    <div className='border-t border-border-primary flex  items-center p-5'>
                        <button className='btn-primary text-xs font-medium text-center whitespace-nowrap lg:text-sm pl-10'>
                            Add more Questions
                        </button>
                        <hr className='w-0.5 h-6 mx-10 border border-border-primary' />
                        <button className='flex align-middle items-center space-x-3 text-subtext-primary text-sm font-medium whitespace-nowrap px-5 py-3'>
                            <Pencil className='mr-2 h-5 w-5' /> Edit
                        </button>
                        <hr className='w-0.5 h-6 mx-10 border border-border-primary' />
                        <button className='flex align-middle items-center space-x-3 text-sm font-medium whitespace-nowrap px-5 py-3'>
                            <HardDriveUpload className='mr-2 h-5 w-5' /> Upload
                        </button>
                        <hr className='w-0.5 h-6  mx-10 border border-border-primary' />
                        <button className='flex align-middle items-center space-x-3 text-red-600 text-sm font-normal whitespace-nowrap px-5 py-3'>
                            <Trash2 className='mr-2 h-5 w-5' /> Delete
                        </button>
                    </div>
                </div>
                <div className='text-end pt-10'>
                    <button className='back-button' Click={() => navigate('/questions')}>
                        Back
                    </button>
                    <button
                        className='btn-fill'
                        onClick={() => {
                            toast.custom(
                                (t) => (
                                    <div className='bg-green-200 text-primary-green px-5 flex font-semibold items-center rounded-md whitespace-nowrap text-xs py-3'>
                                        <Check className='bg-primary-green text-white rounded-full p-0.5 mr-2 h-4 w-4 stroke-3' />
                                        Questions Updated Succesfull.
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
        </div>
    );
};

export default QuestionsEdit;
