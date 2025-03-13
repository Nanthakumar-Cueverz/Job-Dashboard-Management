import React, { useState } from 'react';
import { Plus, Minus, Clock } from 'lucide-react';
import Input from '../common/Input';
import RadioGroup from '../common/RadioGroup';
const CandidateQuestions = ({ className, classNameInner, checkBox, ListNumbers, title }) => {
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
        setExpandedQuestions((prev) =>
            prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question],
        );
    };

    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>{title}</h2>
            <div className={`space-y-2 p-1 md:p-5 rounded-lg mb-5 ${className}`}>
                {questions.map((question, index) => (
                    <div>
                        <label key={index} className='flex justify-between '>
                            <div className='flex space-x-5 space-y-1 lg:space-y-6 pb-3 md:pb-0'>
                                <div className={`w-fit ${checkBox}`}>
                                    <input
                                        type='checkbox'
                                        className='lg:h-5 lg:w-5 whitespace-normal text-blue-600 border border-gray-600 shadow active:border-0  outline-0 rounded'
                                        checked={selectedQuestions.includes(question)}
                                        onChange={() => handleSelect(question)}
                                    />
                                </div>
                                <div className={`w-fit ${ListNumbers}`}>
                                    <span className='font-normal text-table-text'>
                                        {index + 1}.
                                    </span>
                                </div>
                                <div>
                                    <h6 className='para text-xs lg:text-[14px] mr-5 md:mr-0'>
                                        {question}
                                    </h6>
                                </div>
                            </div>
                            <div className='text-end w-10'>
                                <button
                                    onClick={() => handleExpand(question)}
                                    className='text-xs lg:text-sm text-table-text bg-neutral-200 rounded-full p-1'
                                >
                                    {expandedQuestions.includes(question) ? (
                                        <Minus className='w-5 h-5' />
                                    ) : (
                                        <Plus className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                        </label>
                        {expandedQuestions.includes(question) && (
                            <ExpandSectionDetail classname={classNameInner} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateQuestions;

export const ExpandSectionDetail = ({ classname }) => {
    const [selectedOption, setSelectedOption] = useState('Audio');
    const [selectCategory, setSelectCategory] = useState('Tech');
    const questionMode = ['Multiple choice', 'Audio'];
    const questionCategory = ['Tech', 'HR'];
    return (
        <div className={`mb-5 bg-primary-background py-5 px-3 md:p-3 rounded-lg ${classname}`}>
            <div>
                <h1 className='card-title pb-2'>Possible answers</h1>
                <Input
                    placeholder='Enter Job Title'
                    className='bg-white text-table-text text-xs'
                    value='Data Analyst, Data Scientist, Data Engineer, Data Science Consultant, Data Mining Specialist'
                />
                <div className='grid grid-cols-12 gap-2 md:gap-4  h-full py-2'>
                    <div className='col-span-6 md:col-span-5 h-full'>
                        <h1 className='md:card-title pb-2'>Question Mode</h1>
                        <RadioGroup
                            options={questionMode}
                            name='question-type'
                            selectedValue={selectedOption}
                            onChange={setSelectedOption}
                        />
                    </div>
                    <div className='col-span-6 md:col-span-5  h-full'>
                        <h1 className='card-title pb-2'>Question Category</h1>
                        <RadioGroup
                            options={questionCategory}
                            selectedValue={selectCategory}
                            onChange={setSelectCategory}
                        />
                    </div>
                    <div className='col-span-6 md:col-span-2  h-full'>
                        <h1 className='card-title pb-2'>Timer</h1>
                        <h6 className='flex items-center text-table-text text-sm'>
                            <Clock className='w-4 h-4 mr-1' /> <span>2 Min</span>
                        </h6>
                    </div>
                    <div className='col-span-6 md:col-span-5 md:pt-4  h-full'>
                        <h1 className='card-title pb-2'>Complexity level</h1>
                        <h6 className='flex items-center text-table-text text-sm'>3</h6>
                    </div>
                    <div className='col-span-6 md:col-span-5  h-full'>
                        <h1 className='card-title pb-2'>Metadata</h1>
                        <h6 className='flex items-center text-table-text text-sm'>ML</h6>
                    </div>
                    <div className='col-span-6 md:col-span-2 md:pt-4  h-full'>
                        <h1 className='card-title pb-2'>Priority</h1>
                        <h6 className='flex items-center text-table-text text-sm'>High</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};
