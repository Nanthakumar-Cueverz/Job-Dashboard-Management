import React, { useState } from 'react';
import profile from '../assets/images/profile.jpg';
import aipersion from '../assets/images/screening.jpg';
import { MapPin, MessageSquareText, Phone, Check, X, Play } from 'lucide-react';
import RadioGroup from '../components/common/RadioGroup';
const CandidateScoreCard = () => {
    const [selectedOption, setSelectedOption] = useState('A. Pandas');
    const [selectAnswer, setSelectAnswer] = useState('B. scikit-learn');
    const questionMode = ['A. Pandas', 'B. scikit-learn', 'C. TensorFlow'];
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-12 space-x-5'>
                <div className='col-span-4 bg-table-background rounded-md p-5'>
                    {/* Persional details */}
                    <div className='flex items-center space-x-3 pb-10 border-b border-border-primary'>
                        <img src={profile} alt='' className='w-20 h-20 rounded-md' />
                        <div className='space-y-2'>
                            <h2 className='text-subtext-primary pb-0 mb-0 font-normal text-lg'>
                                John Snow
                            </h2>
                            <p className='para'>Data scientist</p>
                            <span className='bg-blue-background text-text-primary px-3 py-1 text-xs rounded-full font-semibold'>
                                Full Time
                            </span>
                        </div>
                    </div>
                    {/* Contact details */}
                    <div className='space-y-5 py-5 border-b border-border-primary'>
                        <button className='text-paragraph text-sm flex items-center'>
                            <MapPin className='mr-2' />
                            Marina East, Singapore
                        </button>
                        <button className='text-paragraph text-sm flex items-center'>
                            <MessageSquareText className='mr-2' />
                            Jhon snow@gmail.com
                        </button>
                        <button className='text-paragraph text-sm flex items-center'>
                            <Phone className='mr-2' />+ 91 467 (5463) 657
                        </button>
                    </div>
                    {/* Score */}
                    <div className='py-5'>
                        <div className='bg-secondary/70 rounded-t-md py-3 text-center font-semibold mb-2'>
                            <h2>Score</h2>
                        </div>
                        <div className='bg-secondary/70 text-primary rounded-b-md font-semibold py-10'>
                            <h2 className='text-6xl text-center'>89%</h2>
                        </div>
                    </div>
                </div>
                {/* section right */}
                <div className='col-span-8 '>
                    <div className='relative'>
                        <img src={aipersion} alt='' className='rounded-md' />
                        <div className='absolute inset-0 flex justify-center items-center bg-black/30 rounded-md'>
                            <Play className='fill-white bg-primary text-white p-4 rounded-full w-12 h-12' />
                        </div>
                    </div>

                    <div className='bg-table-background rounded-t-md'>
                        <div className='grid grid-cols-12 space-x-4 bg-secondary/70 text-subtext-primary rounded-t-md mt-5 font-semibold'>
                            <div className='col-span-5 p-5'>
                                <h2>Questions</h2>
                            </div>
                            <div className='col-span-5 p-5'>
                                <h2>Answer</h2>
                            </div>
                            <div className='col-span-2 p-5'>
                                <h2>Results</h2>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='grid grid-cols-12 '>
                                <div className='col-span-5 p-5 border-r border-b border-border-primary'>
                                    <h2>1. Tell me about an Array?</h2>
                                </div>
                                <div className='col-span-5 p-5 border-r border-b border-border-primary'>
                                    <div className='bg-white rounded-full py-2 px-2 flex items-center space-x-3'>
                                        <div className='w-fit whitespace-nowrap border-r border-border-primary pr-3'>
                                            <Play className='fill-white bg-primary text-white p-3 rounded-full w-10 h-10' />
                                        </div>
                                        <div>
                                            <p className='para text-subtext-primary text-[9px]'>
                                                Array is a linear data structure where all elements
                                                are arranged sequentially.
                                            </p>
                                            <span className='para text-[8px]'>
                                                See Transcription
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2 p-5 border-b border-border-primary flex justify-center items-center'>
                                    <Check className='text-white bg-primary-green rounded-full p-3 w-12 h-12' />
                                </div>
                                <div className='col-span-5 border-r border-b p-5 border-border-primary'>
                                    <h2>2. Preferred Python library for data manipulation?</h2>
                                    <RadioGroup
                                        className='lg:block pt-2'
                                        options={questionMode}
                                        name='question-type'
                                        selectedValue={selectedOption}
                                        onChange={setSelectedOption}
                                    />
                                </div>
                                <div className='col-span-5 border-r border-b p-5 border-border-primary'>
                                    <h2>2. Preferred Python library for data manipulation?</h2>
                                    <RadioGroup
                                        className='lg:block pt-2'
                                        options={questionMode}
                                        name='question-type'
                                        selectedValue={selectAnswer}
                                        onChange={setSelectAnswer}
                                    />
                                </div>
                                <div className='col-span-2 border-b border-border-primary p-5 flex justify-center items-center'>
                                    <X className='text-white bg-red-600 rounded-full p-3 w-12 h-12' />
                                </div>
                                <div className='col-span-5 p-5 border-r border-border-primary'>
                                    <h2>3. Tell me about an Database?</h2>
                                </div>
                                <div className='col-span-5 p-5 border-r border-border-primary'>
                                    <div className='bg-white rounded-full py-2 px-2 flex items-center space-x-3'>
                                        <div className='w-fit whitespace-nowrap border-r border-border-primary pr-3'>
                                            <Play className='fill-white bg-primary text-white p-3 rounded-full w-10 h-10' />
                                        </div>
                                        <div>
                                            <p className='para text-subtext-primary text-[9px]'>
                                                Array is a linear data structure where all elements
                                                are arranged sequentially.
                                            </p>
                                            <span className='para text-[8px]'>
                                                See Transcription
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2 p-5  border-border-primary flex justify-center items-center'>
                                    <Check className='text-white bg-primary-green rounded-full p-3 w-12 h-12' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateScoreCard;
