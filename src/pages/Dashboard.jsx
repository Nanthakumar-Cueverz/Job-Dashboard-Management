import React, { useEffect, useState } from 'react';
import Check from '@icons/check.svg?react';
import empty from '../assets/images/empty-icon.png';
import AddIcon from '@icons/plus.svg?react';
import UploadFiles from '../components/common/UploadFiles';
import Input from '../components/common/Input';
import TextArea from '../components/common/TextArea';
import UploadBlack from '@icons/upload-black.svg?react';
import Stars from '@icons/stars.svg?react';
import Aleart from '@icons/circle-alert.svg?react';
import ModalPopup from '../components/common/ModalPopup';
import { Oval } from 'react-loader-spinner';
import Loader from '../components/common/Loader';
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
    const [generateQuestionsModal, setGenerateQuestionsModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isQuestionsImported, setIsQuestionsImported] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Initially false

    // Load questions from sessionStorage when component mounts
    useEffect(() => {
        const storedQuestions = sessionStorage.getItem('selectedQuestions');
        if (storedQuestions) {
            setSelectedQuestions(JSON.parse(storedQuestions));
            setIsQuestionsImported(true);
        }
    }, []); // Run only on initial render

    // Show loading only when the modal opens
    useEffect(() => {
        if (generateQuestionsModal) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000); // Simulated loading time
        }
    }, [generateQuestionsModal]);

    return (
        <div>
            {/* Hide input section after import */}
            {!isQuestionsImported && (
                <div className='flex items-center align-middle justify-between space-x-5'>
                    <div className='flex border border-border-secondary rounded-md w-full'>
                        <input
                            placeholder='Enter a topic'
                            className='w-full border-r border-border-secondary active:border-0 outline-0 pl-2 text-sm'
                        />
                        <button
                            onClick={() => setGenerateQuestionsModal(true)}
                            className='flex align-middle items-center space-x-2 text-primary text-xs font-semibold whitespace-nowrap px-5 py-3'
                        >
                            <Stars />
                            Generative AI <Aleart className='h-4 w-4 ml-2 fill-secondary' />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => setGenerateQuestionsModal(true)}
                            className='outline-button gap-x-2 whitespace-nowrap flex'
                        >
                            <UploadBlack /> Upload
                        </button>
                    </div>
                </div>
            )}

            {/* Display imported questions */}
            {isQuestionsImported && (
                <div>
                    <div>
                        <h1 className='text-md font-semibold'>Candidate Questions</h1>
                    </div>
                    <div className='bg-[#f6f6f6] p-5'>
                        <div>
                            <ul className='list-decimal pl-5 space-y-2 mt-3'>
                                {selectedQuestions.map((question, index) => (
                                    <li
                                        key={index}
                                        className='text-sm text-paragraph pb-3 last:pb-0'
                                    >
                                        {question}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex gap-3 mt-3'>
                            <button
                                onClick={() => setGenerateQuestionsModal(true)}
                                className='btn-primary'
                            >
                                Add More Questions
                            </button>
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem('selectedQuestions');
                                    setSelectedQuestions([]);
                                    setIsQuestionsImported(false);
                                }}
                                className='btn-secondary'
                            >
                                Clear Questions
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Popup */}
            <ModalPopup
                isOpen={generateQuestionsModal}
                onClose={() => setGenerateQuestionsModal(false)}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <ImportedQuestions
                        onClose={() => {
                            setGenerateQuestionsModal(false);
                            const storedQuestions = sessionStorage.getItem('selectedQuestions');
                            if (storedQuestions) {
                                setSelectedQuestions(JSON.parse(storedQuestions));
                                setIsQuestionsImported(true);
                            }
                        }}
                    />
                )}
            </ModalPopup>
        </div>
    );
};

const Candidates = () => <div>Candidates</div>;

const ImportedQuestions = ({ onClose }) => {
    const questions = [
        'What is the difference between supervised and unsupervised learning?',
        'What is feature engineering and why is it important?',
        'Explain the concepts of bias and variance in the context of machine learning.',
        'What is cross-validation and why is it used?',
        'How does regularization help in model building, and what are some common types?',
        'What is the difference between precision and recall?',
        'What is a confusion matrix, and what information does it provide?',
        'Name a few common activation functions used in neural networks and mention one use case for each.',
    ];

    const [selectedQuestions, setSelectedQuestions] = useState(() => {
        // Load previously selected questions from sessionStorage
        const storedQuestions = sessionStorage.getItem('selectedQuestions');
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });

    const handleSelect = (question) => {
        setSelectedQuestions((prev) => {
            const updatedSelection = prev.includes(question)
                ? prev.filter((q) => q !== question) // Remove if already selected
                : [...prev, question]; // Add if not selected

            sessionStorage.setItem('selectedQuestions', JSON.stringify(updatedSelection));
            return updatedSelection;
        });
    };

    const handleImport = () => {
        onClose(); // Close modal
    };

    return (
        <div className='spave-y-10'>
            <div className='border-b border-border-primary pb-5 mb-5'>
                <h2 className='text-xl font-semibold'>AI Question For Data Scientist </h2>
            </div>
            <div className='space-y-2 border-b border-border-primary pb-5 mb-5'>
                {questions.map((question, index) => (
                    <label key={index} className='flex space-x-5 space-y-6'>
                        <div className='w-fit'>
                            <input
                                type='checkbox'
                                className='h-5 w-5 whitespace-normal text-blue-600 border border-gray-600 shadow active:border-0  outline-0 rounded'
                                checked={selectedQuestions.includes(question)}
                                onChange={() => handleSelect(question)}
                            />
                        </div>
                        <div>
                            <h6 className='para text-[16px]'>{question}</h6>
                        </div>
                    </label>
                ))}
            </div>
            <div className='text-end'>
                <button onClick={handleImport} className='btn-fill bg-neutral-500'>
                    Import
                </button>
            </div>
        </div>
    );
};
