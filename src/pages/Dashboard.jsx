import React, { useState } from 'react';
import Check from '../assets/icons/check.svg?react';
import empty from '../assets/images/empty-icon.png';
import AddIcon from '../assets/icons/plus.svg?react';
const Dashboard = () => {
    return (
        <div className='py-10'>
            <Steps />
            <EmptySection />
        </div>
    );
};

export default Dashboard;

const Steps = () => {
    const [steps, setStep] = useState({
        stepsItems: ['Job Info', 'Questions', 'Candidates'],
        currentStep: 2,
    });

    return (
        <div className='max-w-2xl mx-auto px-4 md:px-0'>
            <ul aria-label='Steps' className='flex items-center text-gray-600 font-medium'>
                {steps.stepsItems.map((item, idx) => {
                    const isCompleted = steps.currentStep > idx + 1;
                    const isActive = steps.currentStep === idx + 1;
                    const isFuture = steps.currentStep < idx + 1;

                    return (
                        <li key={idx} className='flex-1 last:flex-none flex md:items-center'>
                            <div className='flex items-center flex-col'>
                                {/* Mobile line between steps */}
                                <hr
                                    className={`h-12 border md:hidden ${
                                        isCompleted ? 'border-green-500' : 'border-gray-300'
                                    }`}
                                />
                            </div>

                            {/* Step Text + Icon */}
                            <div className='h-8 flex items-center md:h-auto'>
                                <h3
                                    className={`text-sm border-2 py-4 px-10 rounded-full w-fit whitespace-nowrap flex items-center gap-2
                                    ${
                                        isCompleted
                                            ? 'bg-primary-green text-white border-primary-green'
                                            : ''
                                    }
                                    ${isActive ? 'border-blue-500 text-primary' : ''}
                                    ${isFuture ? 'border-gray-300' : ''}`}
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

const EmptySection = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center'>
                <img src={empty} alt='No Jobs' className='mb-4' />
                <p className='text-gray-700 font-medium'>NO JOB POST AVAILABLE</p>
                <button className='btn-fill flex items-center gap-2 mt-3'>
                    <AddIcon />
                    Create One
                </button>
            </div>
        </div>
    );
};
