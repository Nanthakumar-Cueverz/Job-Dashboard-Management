import React, { useEffect, useState } from 'react';
import UploadFiles from '../components/common/UploadFiles';
import Input from '../components/common/Input';
import { Plus, Minus, Clock, Check, Eye } from 'lucide-react';
import UploadBlack from '@icons/monitor-up.svg?react';
import Stars from '@icons/stars.svg?react';
import Aleart from '@icons/circle-alert.svg?react';
import ModalPopup from '../components/common/ModalPopup';
import Loader from '../components/common/Loader';
import { columns, data, Sectioncolumns } from '../Content';
import ReusableDataTable from '../components/common/ReusableDataTable';
import CloseIcon from '@icons/x.svg?react';
import JobDetailsForm from '../components/ui/JobDetailsForm';
import RadioGroup from '../components/common/RadioGroup';
import CandidateTables from '../components/ui/CandidateTables';

const Dashboard = () => {
    const [currentStep, setCurrentStep] = useState(2);
    return (
        <div className='py-0 lg:py-10'>
            <Steps currentStep={currentStep} />
            <StepContent currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
    );
};

export default Dashboard;

//  Step Indicator Component
const Steps = ({ currentStep }) => {
    const stepsItems = ['Job Info', 'Questions', 'Candidates'];
    return (
        <div className='max-w-4xl mx-auto lg:px-4 md:px-0 md:bg-white bg-gray-100 rounded-md py-3 px-2'>
            <ul aria-label='Steps' className='flex items-center text-gray-600  font-medium'>
                {stepsItems.map((item, idx) => {
                    const isCompleted = currentStep > idx + 1;
                    const isActive = currentStep === idx + 1;

                    return (
                        <li
                            key={idx}
                            className='flex-1 last:flex-none flex items-center md:items-center'
                        >
                            <div className='h-8 flex items-center md:h-auto'>
                                <h3
                                    className={`text-sm border-0 md:border-2 py-2 px-2 lg:py-4 lg:px-10 rounded-full w-fit whitespace-nowrap flex items-center gap-2
                                    ${
                                        isCompleted
                                            ? 'bg-none lg:bg-primary-green text-primary-green font-semibold  lg:text-white border-primary-green'
                                            : 'text-gray-300'
                                    }
                                    ${
                                        isActive
                                            ? ' lg:border-blue-500 text-primary'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    {isCompleted && (
                                        <Check className='text-white lg:text-primary-green bg-primary-green lg:bg-white rounded-full p-1 stroke-2 h-5 w-5 lg:h-6 lg:w-6 ' />
                                    )}
                                    {item}
                                </h3>
                            </div>
                            <hr
                                className={`w-full border md:block ${
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

//  Step Content Component (Renders Step 1, 2, 3)
const StepContent = ({ currentStep, setCurrentStep }) => {
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    return (
        <div className='max-w-4xl mx-auto mt-10 rounded-md'>
            {currentStep === 1 && <JobInfo setIsNextDisabled={setIsNextDisabled} />}
            {currentStep === 2 && <Questions setIsNextDisabled={setIsNextDisabled} />}
            {currentStep === 3 && <Candidates />}

            <div className='flex justify-end mt-4'>
                {currentStep > 1 && (
                    <button className='back-button' onClick={() => setCurrentStep(currentStep - 1)}>
                        Back
                    </button>
                )}
                {currentStep < 3 ? (
                    <button
                        className={`btn-fill ${isNextDisabled ? 'btn-disabled' : 'btn-fill'}`}
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={isNextDisabled}
                    >
                        Next
                    </button>
                ) : (
                    <a href='/interviewai/interview' className='btn-fill'>
                        Submit
                    </a>
                )}
            </div>
        </div>
    );
};

//  Step  1
const JobInfo = ({ setIsNextDisabled }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        selectedOptions: [],
    });

    useEffect(() => {
        const isDisabled = !(formData.title.trim() && formData.description.trim());
        setIsNextDisabled(isDisabled);
    }, [formData, setIsNextDisabled]);

    return (
        <div>
            <UploadFiles
                onFileSelect={() => {}} // No validation required for file upload
                label='Attachments'
                title='Upload a Job Requirement'
            />
            <div className='py-5 space-y-5'>
                <JobDetailsForm
                    formData={formData}
                    setFormData={setFormData}
                    title='Upload Job Details'
                />
            </div>
        </div>
    );
};

// Step  2
const Questions = ({ setIsNextDisabled }) => {
    const [generateQuestionsModal, setGenerateQuestionsModal] = useState(false);
    const [uploadQuestion, setUploadQuestions] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isQuestionsImported, setIsQuestionsImported] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Initially false
    const [expandedQuestions, setExpandedQuestions] = useState([]);
    useEffect(() => {
        const storedQuestions = sessionStorage.getItem('selectedQuestions');
        if (storedQuestions) {
            setSelectedQuestions(JSON.parse(storedQuestions));
            setIsQuestionsImported(true);
            setIsNextDisabled(false);
        } else {
            setIsNextDisabled(true);
        }
    }, []);
    useEffect(() => {
        if (generateQuestionsModal) {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
        }
    }, [generateQuestionsModal]);

    const handleExpand = (selectedQuestions) => {
        setExpandedQuestions(
            (prev) =>
                prev.includes(selectedQuestions)
                    ? prev.filter((q) => q !== selectedQuestions)
                    : [...prev, selectedQuestions], // Expand if not expanded
        );
    };
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
                            className='flex align-middle items-center space-x-2 text-primary text-xs font-semibold whitespace-nowrap p-3 lg:px-5 py-3'
                        >
                            <Stars className='m-0' />
                            <span className='hidden lg:block'> Generative AI</span>
                            <Aleart className='h-4 w-4 ml-2 fill-secondary hidden lg:block' />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => setUploadQuestions(true)}
                            className='outline-button px-3 gap-x-2 whitespace-nowrap flex'
                        >
                            <UploadBlack className='h-4 w-4' />
                            <span className='hidden lg:block'>Upload</span>
                        </button>
                    </div>
                </div>
            )}

            {isQuestionsImported && (
                <div>
                    <div>
                        <h1 className='text-md font-semibold mb-5'>Candidate Questions</h1>
                    </div>
                    <div className='bg-[#f6f6f6] p-5 rounded-md'>
                        <div>
                            <ul className='list-decimal pl-5 space-y-0 lg:space-y-2 mt-3'>
                                {selectedQuestions.map((question, index) => (
                                    <div>
                                        <div className='flex justify-between'>
                                            <li
                                                key={index}
                                                className='text-xs lg:text-sm text-paragraph pb-5 last:pb-0 '
                                            >
                                                {question}
                                            </li>
                                            <button
                                                onClick={() => handleExpand(question)}
                                                className='text-xs lg:text-sm text-table-text bg-neutral-200 rounded-full h-fit p-1'
                                            >
                                                {expandedQuestions.includes(question) ? (
                                                    <Minus className='w-5 h-5' />
                                                ) : (
                                                    <Plus className='w-5 h-5' />
                                                )}
                                            </button>
                                        </div>
                                        {expandedQuestions.includes(question) && (
                                            <ExpandSectionDetail classname='bg-white mt-2 -ml-5' />
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className='flex gap-3 mt-3 justify-evenly  items-center border-t border-border-primary pt-3'>
                            <button
                                onClick={() => setGenerateQuestionsModal(true)}
                                className='btn-primary text-xs whitespace-nowrap lg:text-sm'
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
                                <Stars className='mr-2 hidden md:block' /> <span>Generate AI</span>
                            </button>
                            <hr className='w-0.5 h-6 border border-border-primary' />
                            <button
                                onClick={() => setUploadQuestions(true)}
                                className='flex align-middle items-center space-x-3 text-primary text-sm font-normal whitespace-nowrap px-5 py-3'
                            >
                                <UploadBlack className='text-primary mr-2 h-5 w-5' />
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Popup */}
            <ModalPopup
                mobileWidth='350px'
                desktopWidth='700px'
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
                                setIsNextDisabled(false);
                            }
                        }}
                    />
                )}
            </ModalPopup>
            <ModalPopup
                mobileWidth='600px'
                desktopWidth='600px'
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
//  Step  3
const Candidates = () => {
    // const data = [];
    const [createCandidate, setCreateCandidate] = useState(false);
    return (
        <div>
            <div className='flex justify-between items-center pb-5'>
                <h1 className='text-md font-semibold'>Candidates List</h1>
                <button className='outline-button px-3' onClick={() => setCreateCandidate(true)}>
                    <Plus className='h-4 w-4 mr-1' />
                    Add Candidates
                </button>
            </div>
            <div>
                <CandidateTables />
            </div>
            <ModalPopup
                isOpen={createCandidate}
                onClose={() => setCreateCandidate(false)}
                mobileWidth='400px'
                desktopWidth='400px'
            >
                <div>
                    <div className='border-b border-border-primary flex align-middle justify-between pb-3 mb-3 '>
                        <h2 className='modal-title text-subtext-primary '>Add Candidates</h2>
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
                        <UploadFiles title='Upload Resume' />
                    </div>
                    <div className='text-end mt-5'>
                        <button className='btn-fill py-3'>Save</button>
                    </div>
                </div>
            </ModalPopup>
        </div>
    );
};
//  Reusable component for Questions
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
        const storedQuestions = sessionStorage.getItem('selectedQuestions');
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });
    const [expandedQuestions, setExpandedQuestions] = useState([]);

    const handleSelect = (question) => {
        setSelectedQuestions((prev) => {
            const updatedSelection = prev.includes(question)
                ? prev.filter((q) => q !== question)
                : [...prev, question];

            sessionStorage.setItem('selectedQuestions', JSON.stringify(updatedSelection));
            return updatedSelection;
        });
    };
    const handleExpand = (question) => {
        setExpandedQuestions(
            (prev) =>
                prev.includes(question)
                    ? prev.filter((q) => q !== question) // Collapse if already expanded
                    : [...prev, question], // Expand if not expanded
        );
    };

    const handleImport = () => {
        onClose(); // Close modal
    };

    return (
        <div className='spave-y-10'>
            <div className='border-b border-border-primary pb-2 mb-2 lg:pb-5 lg:mb-5'>
                <h2 className='text-xl font-semibold'>AI Question For Data Scientist </h2>
            </div>
            <div className='space-y-2 border-b border-border-primary pb-5 mb-5'>
                {questions.map((question, index) => (
                    <div>
                        <label key={index} className='flex justify-between '>
                            <div className='flex space-x-5 space-y-1 lg:space-y-6'>
                                <div className='w-fit'>
                                    <input
                                        type='checkbox'
                                        className='lg:h-5 lg:w-5 whitespace-normal text-blue-600 border border-gray-600 shadow active:border-0  outline-0 rounded'
                                        checked={selectedQuestions.includes(question)}
                                        onChange={() => handleSelect(question)}
                                    />
                                </div>
                                <div>
                                    <h6 className='para text-xs lg:text-[16px]'>{question}</h6>
                                </div>
                            </div>
                            <div className='text-end w-10'>
                                <button
                                    onClick={() => handleExpand(question)}
                                    className='text-xs lg:text-sm text-subtext-primary bg-primary-background rounded-full p-1'
                                >
                                    {expandedQuestions.includes(question) ? (
                                        <Minus className='w-5 h-5' />
                                    ) : (
                                        <Plus className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                        </label>
                        {expandedQuestions.includes(question) && <ExpandSectionDetail />}
                    </div>
                ))}
            </div>
            <div className='text-end'>
                <button
                    onClick={handleImport}
                    className={`lg:btn-fill text-xs lg:text-sm  ${
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

const ExpandSectionDetail = ({ classname }) => {
    const [selectedOption, setSelectedOption] = useState('Audio');
    const [selectCategory, setSelectCategory] = useState('Tech');
    const questionMode = ['Multiple choice', 'Audio'];
    const questionCategory = ['Tech', 'HR'];
    return (
        <div className={`mb-5 bg-primary-background p-3 rounded-lg ${classname}`}>
            <div>
                <h1 className='card-title pb-2'>Possible answers</h1>
                <Input
                    placeholder='Enter Job Title'
                    className='bg-white text-table-text text-xs'
                    value='Data Analyst, Data Scientist, Data Engineer, Data Science Consultant, Data Mining Specialist'
                />
                <div className='grid grid-cols-12 gap-4 py-2'>
                    <div className='col-span-5'>
                        <h1 className='card-title pb-2'>Question Mode</h1>
                        <RadioGroup
                            options={questionMode}
                            name='question-type'
                            selectedValue={selectedOption}
                            onChange={setSelectedOption}
                        />
                    </div>
                    <div className='col-span-5'>
                        <h1 className='card-title pb-2'>Question Category</h1>
                        <RadioGroup
                            options={questionCategory}
                            selectedValue={selectCategory}
                            onChange={setSelectCategory}
                        />
                    </div>
                    <div className='col-span-2'>
                        <h1 className='card-title pb-2'>Timer</h1>
                        <h6 className='flex items-center text-table-text text-sm'>
                            <Clock className='w-4 h-4 mr-1' /> <span>2 Min</span>
                        </h6>
                    </div>
                    <div className='col-span-5 pt-4'>
                        <h1 className='card-title pb-2'>Complexity level</h1>
                        <h6 className='flex items-center text-table-text text-sm'>3</h6>
                    </div>
                    <div className='col-span-5 pt-4'>
                        <h1 className='card-title pb-2'>Metadata</h1>
                        <h6 className='flex items-center text-table-text text-sm'>ML</h6>
                    </div>
                    <div className='col-span-2 pt-4'>
                        <h1 className='card-title pb-2'>Priority</h1>
                        <h6 className='flex items-center text-table-text text-sm'>High</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};
