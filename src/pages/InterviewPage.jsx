import React, { useState, useEffect } from 'react';
import AiElement from '../assets/images/ai-icon.png';
import ModalPopup from '../components/common/ModalPopup';
import session from '../assets/images/screening.jpg';
import Mic from '../assets/icons/mic.svg?react';
import StopIcon from '../assets/icons/circle-stop.svg?react';
import profile from '../assets/images/profile.jpg';
import aiicon from '../assets/images/ai-icon.png';
import Check from '../assets/icons/check.svg?react';
import { useNavigate } from 'react-router-dom';
import LoaderIcon from '../assets/icons/audio-lines.svg?react';
const content = [
    'Test Equipment: Ensure camera, mic, and internet work.',
    'Quiet Space: Choose a noise-free, professional setting.',
    'Proper Lighting: Maintain clear visibility.',
    'Dress Appropriately: Wear professional attire.',
    'Mute When Idle: Prevent background noise.',
    'Follow Instructions: Adhere to interviewer’s guidelines.',
    'Consent: Agree to recording as stated.',
    'Be Punctual: Join the session on time.',
];
const questions = [
    'What is your experience with machine learning?',
    'Can you explain overfitting and underfitting?',
    // 'What are the different types of neural networks?',
    // 'How do you handle missing data in datasets?',
    // 'What is the difference between supervised and unsupervised learning?',
];

const answers = [
    'I have experience with machine learning models, including supervised and unsupervised learning, using TensorFlow and PyTorch.',
    'Overfitting occurs when a model learns noise instead of patterns, while underfitting happens when a model is too simple to capture data trends.',
    'Types of neural networks include Feedforward (FNN), Convolutional (CNN), Recurrent (RNN), LSTM, and Generative Adversarial Networks (GANs).',
    'Missing data can be handled by removing rows/columns, imputing values (mean, median, mode), or using models that handle missing values.',
    'Supervised learning uses labeled data for training, while unsupervised learning finds patterns in unlabeled data.',
];

const InterviewPage = () => {
    const [showCondition, setShowConditions] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [isScreening, setIsScreening] = useState(false);

    // Load session state on mount
    // useEffect(() => {
    //     const storedAcceptance = sessionStorage.getItem('termsAccepted');
    //     if (storedAcceptance === 'true') {
    //         setIsScreening(true);
    //     }
    // }, []);

    // Handle acceptance and transition to ScreeningSession
    const handleStart = () => {
        // sessionStorage.setItem('termsAccepted', 'true');
        sessionStorage.clear();
        setIsScreening(true);
        setShowConditions(false);
    };

    if (isScreening) {
        return <ScreeningSession />;
    }

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='max-w-5xl text-center space-y-4 flex flex-col items-center'>
                <img src={AiElement} alt='AI Icon' className='w-32 h-32 object-contain' />
                <h1 className='text-3xl font-semibold'>Welcome Joseph</h1>
                <p className='para max-w-3xl'>
                    Welcome and thank you for joining us today for the Data Scientist interview!
                    We’re excited to learn about your background in data analysis, machine learning,
                    and statistical modeling. Please feel free to share your insights, ask
                    questions, and enjoy this discussion.
                </p>
                <button onClick={() => setShowConditions(true)} className='btn-fill text-sm mt-5'>
                    Start an Interview
                </button>
            </div>

            {/* Terms & Conditions Modal */}
            <ModalPopup
                width='400px'
                isOpen={showCondition}
                onClose={() => setShowConditions(false)}
            >
                <div>
                    <h1 className='text-sm font-semibold pb-3 border-b border-border-primary'>
                        Before we begin, please review the following terms
                    </h1>
                    <ul className='list-disc list-inside space-y-3 pt-4'>
                        {content.map((item, index) => (
                            <li key={index} className='para mb-1'>
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Accept Terms Checkbox */}
                    <label className='flex items-center space-x-2 cursor-pointer pt-5'>
                        <input
                            name='terms'
                            checked={accepted}
                            onChange={() => setAccepted(!accepted)}
                            type='checkbox'
                            className='h-4 w-4 text-blue-600 border border-gray-600 shadow outline-0 rounded'
                        />
                        <span className='text-xs para'>
                            Agree to our Terms of Service and Privacy Policy.
                        </span>
                    </label>

                    {/* Start Button */}
                    <div className='flex items-center justify-end mt-8'>
                        <button
                            onClick={handleStart}
                            className={`btn-fill text-sm py-3 ${accepted ? '' : 'btn-disabled'}`}
                            disabled={!accepted}
                        >
                            Start
                        </button>
                    </div>
                </div>
            </ModalPopup>
        </div>
    );
};

const ScreeningSession = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='max-w-lg text-center'>
                <h1 className='text-lg font-bold pb-5'>
                    Hi Joseph, Welcome to screening session - I
                </h1>
                <div className='border rounded-md border-border-primary p-2'>
                    <img src={session} alt='' className='rounded-md' />
                    <ChatBot />
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;

const ChatBot = () => {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [listening, setListening] = useState(false);
    const [waitingForAnswer, setWaitingForAnswer] = useState(false);

    useEffect(() => {
        const storedMessages = sessionStorage.getItem('chatHistory');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            startChat();
        }
    }, []);

    const startChat = () => {
        const firstQuestion = { text: questions[0], sender: 'bot' };
        setMessages([firstQuestion]);
        sessionStorage.setItem('chatHistory', JSON.stringify([firstQuestion]));
    };

    const handleMicClick = () => {
        if (listening || currentQuestionIndex >= questions.length) return;

        setListening(true);
        setWaitingForAnswer(true);

        // Check if the last message is not already "Listening..."
        if (messages.length === 0 || messages[messages.length - 1].text !== 'Listening...') {
            const listeningMessage = {
                text: 'Listening...',
                sender: 'user',
                isListening: true, // 👈 New property to identify listening state
            };
            setMessages((prev) => [...prev, listeningMessage]);
            sessionStorage.setItem('chatHistory', JSON.stringify([...messages, listeningMessage]));
        }
    };

    const handleStopClick = () => {
        if (!listening) return;

        setListening(false);
        setWaitingForAnswer(false);

        let updatedMessages = [...messages];

        // Remove "Listening..." message if it exists
        if (updatedMessages[updatedMessages.length - 1].text === 'Listening...') {
            updatedMessages.pop();
        }

        // Add the user's actual answer
        updatedMessages.push({ text: answers[currentQuestionIndex], sender: 'user' });

        setMessages(updatedMessages);
        sessionStorage.setItem('chatHistory', JSON.stringify(updatedMessages));

        setTimeout(() => {
            askNextQuestion();
        }, 2000);
    };

    const askNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            const botQuestion = { text: questions[nextIndex], sender: 'bot' };
            setMessages((prev) => [...prev, botQuestion]);
            setCurrentQuestionIndex(nextIndex);
        } else {
            // When last question is answered, update state to trigger "Complete" button
            setCurrentQuestionIndex(questions.length);
        }
    };

    const handleComplete = () => {
        setCompleted(true);
        const completionMessage = {
            text: 'Interview session completed! Thank you.',
            sender: 'bot',
        };
        setMessages((prev) => [...prev, completionMessage]);
        sessionStorage.setItem('chatHistory', JSON.stringify([...messages, completionMessage]));
        setTimeout(() => {
            setCompleted(false);
            navigate('/');
        }, 5000);
    };

    return (
        <div className=''>
            <div>
                <div className='w-full max-w-lg h-[500px] bg-white p-4 flex flex-col overflow-y-auto scrollbar-hide'>
                    {messages.length === 0 ? (
                        <div className='text-center text-gray-500 mt-auto'>No messages yet</div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex align-bottom items-end ${
                                    msg.sender === 'user' ? 'justify-start' : 'justify-end'
                                } mb-2`}
                            >
                                {msg.sender === 'user' && (
                                    <img
                                        src={profile}
                                        alt='User'
                                        className='h-8 w-8 rounded-full mr-2'
                                    />
                                )}
                                <div
                                    className={`p-3 max-w-xs text-sm text-black mb-5 ${
                                        msg.sender === 'user'
                                            ? 'bg-[#F6F6F6] text-start rounded-t-lg rounded-br-lg '
                                            : 'bg-secondary text-right rounded-t-lg rounded-bl-lg'
                                    }`}
                                >
                                    {msg.isListening ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='audio-wave'>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            {msg.text}
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>

                                {msg.sender === 'bot' && (
                                    <img
                                        src={aiicon}
                                        alt='Bot'
                                        className='h-8 w-8 rounded-full ml-2'
                                    />
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className='w-full max-w-lg flex justify-center border-t border-border-primary pt-5 pb-3'>
                    {currentQuestionIndex < questions.length ? (
                        <div>
                            <button
                                className={`p-3 rounded-full ${
                                    listening ? 'bg-red-500' : 'bg-blue-500'
                                } text-white`}
                                onClick={listening ? handleStopClick : handleMicClick}
                            >
                                {listening ? (
                                    <StopIcon className='h-5 w-5 stroke-2' />
                                ) : (
                                    <Mic className='h-5 w-5 stroke-2' />
                                )}
                            </button>
                            <div className='text-sm'>
                                {listening ? <h6>Stop</h6> : <h6>Start Answer</h6>}
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-end w-full'>
                            <button className='btn-fill' onClick={handleComplete}>
                                Complete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ModalPopup width='400px' isOpen={completed} onClose={() => setCompleted(false)}>
                <div className='p-10 text-center space-y-3 align-middle justify-center flex flex-col'>
                    <Check className='mx-auto text-white stroke-2 mb-5 bg-primary w-20 rounded-full h-20 p-5 shadow-[0_0_15px_theme(colors.secondary)] ring-8 ring-secondary' />
                    <h2 className='text-xl font-semibold'>
                        Your answers are submitted successfully!
                    </h2>
                    <p className='para'>
                        Interview results will be emailed in
                        <span className='text-subtext-primary font-semibold pl-2'>24 hours</span>.
                        Thank you!
                    </p>
                </div>
            </ModalPopup>
        </div>
    );
};
