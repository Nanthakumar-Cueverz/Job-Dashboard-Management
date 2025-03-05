import React, { useEffect, useState } from 'react';
import Check from '@icons/check.svg?react';
import AddIcon from '@icons/plus.svg?react';
import UploadFiles from '../components/common/UploadFiles';
import Input from '../components/common/Input';
import TextArea from '../components/common/TextArea';
import UploadBlack from '@icons/monitor-up.svg?react';
import Stars from '@icons/stars.svg?react';
import Aleart from '@icons/circle-alert.svg?react';
import Eye from '@icons/eye.svg?react';
import ModalPopup from '../components/common/ModalPopup';
import Loader from '../components/common/Loader';
import { data, Sectioncolumns } from '../Content';
import ReusableDataTable from '../components/common/ReusableDataTable';
import CloseIcon from '@icons/x.svg?react';

const Dashboard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
        <div className='py-10'>
            <Steps currentStep={currentStep} />
            <StepContent currentStep={currentStep} setCurrentStep={setCurrentStep} />
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

// 📌 Step Content Component (Renders Step 1, 2, 3)
const StepContent = ({ currentStep, setCurrentStep }) => {
    return (
        <div className='max-w-3xl mx-auto mt-10 rounded-md'>
            {currentStep === 1 && <JobInfo />}
            {currentStep === 2 && <Questions />}
            {currentStep === 3 && <Candidates />}

            <div className='flex justify-end mt-4'>
                {currentStep > 1 && (
                    <button className='back-button' onClick={() => setCurrentStep(currentStep - 1)}>
                        Back
                    </button>
                )}
                {currentStep < 3 ? (
                    <button className='btn-fill' onClick={() => setCurrentStep(currentStep + 1)}>
                        Next
                    </button>
                ) : (
                    <a href='/interview' className='btn-fill'>
                        Submit
                    </a>
                )}
            </div>
        </div>
    );
};
// 📌 Step  1
const JobInfo = () => {
    const handleFileSelect = (file) => {
        console.log('Selected File:', file);
    };
    return (
        <div>
            <div>
                <UploadFiles
                    onFileSelect={handleFileSelect}
                    label='Attachments'
                    title=' Upload a Job Requirement'
                />
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
// 📌 Step  2
const Questions = () => {
    const [generateQuestionsModal, setGenerateQuestionsModal] = useState(false);
    const [uploadQuestion, setUploadQuestions] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isQuestionsImported, setIsQuestionsImported] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Initially false
    useEffect(() => {
        const storedQuestions = sessionStorage.getItem('selectedQuestions');
        if (storedQuestions) {
            setSelectedQuestions(JSON.parse(storedQuestions));
            setIsQuestionsImported(true);
        }
    }, []);
    useEffect(() => {
        if (generateQuestionsModal) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
        }
    }, [generateQuestionsModal]);

    return (
        <div>
            {!isQuestionsImported && (
                <div className='flex items-center align-middle justify-between space-x-5 mb-10'>
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
                            onClick={() => setUploadQuestions(true)}
                            className='outline-button gap-x-2 whitespace-nowrap flex'
                        >
                            <UploadBlack className='h-4 w-4' /> Upload
                        </button>
                    </div>
                </div>
            )}

            {/* Display imported questions */}
            {isQuestionsImported && (
                <div>
                    <div>
                        <h1 className='text-md font-semibold mb-5'>Candidate Questions</h1>
                    </div>
                    <div className='bg-[#f6f6f6] p-5 rounded-md'>
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
                        <div className='flex gap-3 mt-3 justify-evenly  items-center border-t border-border-primary pt-3'>
                            <button
                                onClick={() => setGenerateQuestionsModal(true)}
                                className='btn-primary text-sm'
                            >
                                Add More Questions
                            </button>
                            <hr className='w-0.5 h-6 border border-border-primary' />
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem('selectedQuestions');
                                    setSelectedQuestions([]);
                                    setIsQuestionsImported(false);
                                }}
                                className='flex align-middle items-center space-x-3 text-primary text-sm font-normal whitespace-nowrap px-5 py-3'
                            >
                                <Stars className='mr-2' /> Generate AI
                            </button>
                            <hr className='w-0.5 h-6 border border-border-primary' />
                            <button
                                onClick={() => setUploadQuestions(true)}
                                className='flex align-middle items-center space-x-3 text-primary text-sm font-normal whitespace-nowrap px-5 py-3'
                            >
                                <UploadBlack className='text-primary mr-2 h-5 w-5' />
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Popup */}
            <ModalPopup
                width='600px'
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
            <ModalPopup
                width='500px'
                isOpen={uploadQuestion}
                onClose={() => setUploadQuestions(false)}
            >
                <div>
                    <UploadFiles label='Upload Files' title=' Upload Questions' style='hidden' />
                    <div className='py-5 flex justify-center align-middle space-x-10'>
                        <button
                            onClick={() => {
                                setUploadQuestions(false);
                                setGenerateQuestionsModal(true);
                            }}
                            className='modal-btn-outline'
                        >
                            <Eye className='w-4 h-4 mr-2' />
                            Preview
                        </button>
                        <button
                            className='modal-btn-fill '
                            onClick={() => setUploadQuestions(false)}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </ModalPopup>
        </div>
    );
};
// 📌 Step  3
const Candidates = () => {
    const [createCandidate, setCreateCandidate] = useState(false);
    return (
        <div>
            <div className='flex justify-between items-center pb-5'>
                <h1 className='text-md font-semibold'>Candidates List</h1>
                <button className='outline-button px-3' onClick={() => setCreateCandidate(true)}>
                    <AddIcon className='h-4 w-4 mr-1' />
                    Add Candidates
                </button>
            </div>
            <div>
                <ReusableDataTable columns={Sectioncolumns} data={data} />
            </div>
            <ModalPopup
                isOpen={createCandidate}
                onClose={() => setCreateCandidate(false)}
                width='400px'
            >
                <div>
                    <div className='border-b border-border-primary flex align-middle justify-between pb-3 mb-3 '>
                        <h2 className='modal-title text-primary '>Add Candidates</h2>
                        <button className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 flex items-center justify-center transition duration-200'>
                            <CloseIcon
                                className='w-4 h-4 text-gray-600'
                                onClick={() => setCreateCandidate(false)}
                            />
                        </button>
                    </div>
                    <div className='space-y-5'>
                        <Input label='Candidate Name' placeholder='Enter Name' type='name' />
                        <Input label='Email' placeholder='Enter Email' type='email' />
                        <Input label='Phone Number' placeholder='Enter Phone Number' type='phone' />
                        <>
                            <label className='label'>Default Select</label>
                            <div className='relative z-20'>
                                <select className='relative z-20 w-full appearance-none  outline-none input'>
                                    <option value='invited'>Invited</option>
                                    <option value='in-progress'>In Progress</option>
                                    <option value='available'>Available</option>
                                    <option value='completed'>Completed</option>
                                </select>
                                <span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
                            </div>
                        </>
                    </div>
                </div>
            </ModalPopup>
        </div>
    );
};
// 📌 Reusable component for Questions
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
                <button
                    onClick={handleImport}
                    className={`btn-fill text-sm  ${
                        selectedQuestions.length === 0 ? 'btn-disabled' : 'btn-fill'
                    }`}
                    disabled={selectedQuestions.length === 0}
                >
                    Import
                </button>
            </div>
        </div>
    );
};
