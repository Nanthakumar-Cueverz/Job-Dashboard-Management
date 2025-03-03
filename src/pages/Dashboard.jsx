import React, { useState } from 'react';
import Check from '@icons/check.svg?react';
import empty from '../assets/images/empty-icon.png';
import AddIcon from '@icons/plus.svg?react';
import UploadFiles from '../components/common/UploadFiles';
import Input from '../components/common/Input';
import TextArea from '../components/common/TextArea';
import UploadBlack from '@icons/upload-black.svg?react';
import Stars from '@icons/stars.svg?react';
import Aleart from '@icons/circle-alert.svg?react';
const Dashboard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
        <div className='py-10'>
            <Steps currentStep={currentStep} />
            {currentStep === 0 ? (
                <EmptySection setCurrentStep={setCurrentStep} />
            ) : (
                <StepContent currentStep={currentStep} setCurrentStep={setCurrentStep} />
            )}
        </div>
    );
};

export default Dashboard;

// 📌 Step Indicator Component
const Steps = ({ currentStep }) => {
    const stepsItems = ['Job Info', 'Questions', 'Candidates'];

    return (
        <div className='max-w-2xl mx-auto px-4 md:px-0'>
            <ul aria-label='Steps' className='flex items-center text-gray-600 font-medium'>
                {stepsItems.map((item, idx) => {
                    const isCompleted = currentStep > idx + 1;
                    const isActive = currentStep === idx + 1;

                    return (
                        <li key={idx} className='flex-1 last:flex-none flex md:items-center'>
                            <div className='h-8 flex items-center md:h-auto'>
                                <h3
                                    className={`text-sm border-2 py-4 px-10 rounded-full w-fit whitespace-nowrap flex items-center gap-2
                                    ${
                                        isCompleted
                                            ? 'bg-primary-green text-white border-primary-green'
                                            : ''
                                    }
                                    ${
                                        isActive
                                            ? 'border-blue-500 text-primary'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    {isCompleted && (
                                        <Check
                                            size={16}
                                            className='text-primary-green bg-white rounded-full p-1 stroke-2'
                                        />
                                    )}
                                    {item}
                                </h3>
                            </div>
                            <hr
                                className={`hidden w-full border md:block ${
                                    isCompleted ? 'border-green-500' : 'border-gray-300'
                                }`}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// 📌 Empty Section (Initial State)
const EmptySection = ({ setCurrentStep }) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center'>
                <img src={empty} alt='No Jobs' className='mb-4' />
                <p className='text-gray-700 font-medium'>NO JOB POST AVAILABLE</p>
                <button
                    className='btn-fill flex items-center gap-2 mt-3'
                    onClick={() => setCurrentStep(1)}
                >
                    <AddIcon />
                    Create One
                </button>
            </div>
        </div>
    );
};

// 📌 Step Content Component (Renders Step 1, 2, 3)
const StepContent = ({ currentStep, setCurrentStep }) => {
    return (
        <div className='max-w-2xl mx-auto mt-5 p-5 rounded-md'>
            {currentStep === 1 && <JobInfo />}
            {currentStep === 2 && <Questions />}
            {currentStep === 3 && <Candidates />}

            <div className='flex justify-end mt-4'>
                {currentStep > 1 && (
                    <button className='btn-outline' onClick={() => setCurrentStep(currentStep - 1)}>
                        Back
                    </button>
                )}
                {currentStep < 3 ? (
                    <button className='btn-fill' onClick={() => setCurrentStep(currentStep + 1)}>
                        Next
                    </button>
                ) : (
                    <button className='btn-primary'>Submit</button>
                )}
            </div>
        </div>
    );
};

// 📌 Step Components
const JobInfo = () => {
    const handleFileSelect = (file) => {
        console.log('Selected File:', file);
    };
    return (
        <div>
            <div>
                <UploadFiles onFileSelect={handleFileSelect} />
            </div>
            <div className='py-5 space-y-5'>
                <Input label='Job Title' placeholder='Data Scientist' />
                <TextArea
                    label='Job Description'
                    placeholder='As a Data Scientist, you will transform complex data into actionable insights that drive strategic decision-making. You will work closely with cross-functional teams to develop innovative solutions, build predictive models, and support data-driven business initiatives.'
                />
            </div>
        </div>
    );
};
const Questions = () => {
    return (
        <div>
            <div>
                <label className='label'>Candidate Question</label>
                <div className='flex items-center align-middle justify-between space-x-5'>
                    <div className='flex border border-border-secondary rounded-md w-full '>
                        <input
                            placeholder='Enter a topic'
                            className='w-full border-r border-border-secondary active:border-0 outline-0 pl-2 text-sm'
                        />
                        <button className='flex align-middle items-center space-x-2 text-primary text-xs font-semibold whitespace-nowrap px-5 py-3'>
                            <Stars />
                            Generative AI <Aleart className='h-4 w-4 ml-2 fill-secondary' />
                        </button>
                    </div>
                    <div>
                        <button className='outline-button gap-x-2 whitespace-nowrap flex'>
                            <UploadBlack /> Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const Candidates = () => <div>Candidates</div>;
