import React from 'react';

const CandidateQuestions = ({ onClose }) => {
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

export default CandidateQuestions;
