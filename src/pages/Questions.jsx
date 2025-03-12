import React, { useState } from 'react';
import { CircleDot } from 'lucide-react';

import {
    EllipsisVertical,
    Pencil,
    Eye,
    HardDrive,
    Figma,
    DatabaseZap,
    LayoutTemplate,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Pagination from '../components/common/Pagination';

const jobList = [
    {
        id: 1,
        title: 'Data Scientist',
        icon: HardDrive,
        questions: '10 Question',
        time: '30min',
        color: 'bg-orange-400',
    },
    {
        id: 2,
        title: 'UI UX',
        icon: Figma,
        questions: '10 Question',
        time: '30min',
        color: 'bg-red-400',
    },
    {
        id: 3,
        title: 'Data Engineer',
        icon: DatabaseZap,
        questions: '10 Question',
        time: '30min',
        color: 'bg-yellow-400',
    },
    {
        id: 4,
        title: 'Frontend',
        icon: LayoutTemplate,
        questions: '10 Question',
        time: '30min',
        color: 'bg-cyan-400',
    },
    {
        id: 5,
        title: 'Backend Developer',
        icon: CircleDot,
        questions: '10 Question',
        time: '30min',
        color: 'bg-rose-400',
    },
    { id: 6, title: 'Software Tester', icon: CircleDot, questions: '10 Question', time: '30min' },
    {
        id: 7,
        title: 'Machine Learning Engineer',
        icon: CircleDot,
        questions: '10 Question',
        time: '30min',
    },
    { id: 8, title: 'Data Analyst', icon: CircleDot, questions: '10 Question', time: '30min' },
    { id: 9, title: 'Data Scientist', icon: CircleDot, questions: '10 Question', time: '30min' },
    { id: 10, title: 'UI UX', icon: CircleDot, questions: '10 Question', time: '30min' },
    { id: 11, title: 'Data Engineer', icon: CircleDot, questions: '10 Question', time: '30min' },
    { id: 12, title: 'Frontend', icon: CircleDot, questions: '10 Question', time: '30min' },
    {
        id: 13,
        title: 'Backend Developer',
        icon: CircleDot,
        questions: '10 Question',
        time: '30min',
    },
    { id: 14, title: 'Software Tester', icon: CircleDot, questions: '10 Question', time: '30min' },
    {
        id: 15,
        title: 'Machine Learning Engineer',
        icon: CircleDot,
        questions: '10 Question',
        time: '30min',
    },
    { id: 16, title: 'Data Analyst', icon: CircleDot, questions: '10 Question', time: '30min' },
];

const ITEMS_PER_PAGE = 5;

const Questions = () => {
    const [openJobId, setOpenJobId] = useState(null);

    const toggleMenu = (jobId) => {
        setOpenJobId(openJobId === jobId ? null : jobId);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Filter jobs based on search term
    const filteredJobs = jobList.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    return (
        <div className='max-w-6xl mx-auto'>
            {jobList.length === 0 ? (
                <div className='text-center py-10'>
                    <p className='text-gray-500 text-lg'>No jobs found.</p>
                </div>
            ) : (
                <div>
                    {/* Search bar */}
                    <div className='mb-5'>
                        <Input
                            placeholder='Search for a job...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Job List */}
                    <div>
                        {paginatedJobs.map((job) => (
                            <div
                                key={job.id}
                                className='bg-white border border-border-primary w-full relative p-5 mb-5 rounded-md'
                            >
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        <div
                                            className={`bg-primary-green rounded-md text-white mr-4 p-2 ${job.color}`}
                                        >
                                            <job.icon className='rounded-sm stroke-1 w-10 p-2 h-10 mt-1 lg:mt-0' />
                                        </div>
                                        <div>
                                            <h2 className='text-xl font-semibold pb-2'>
                                                {job.title}
                                            </h2>
                                            <div className='flex space-x-3 text-text-neutral text-sm font-normal'>
                                                <p>{job.questions}</p>
                                                <hr className='h-5 w-0.5 border border-border-primary' />
                                                <p>{job.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='relative inline-block'>
                                        <button onClick={() => toggleMenu(job.id)}>
                                            <EllipsisVertical />
                                        </button>
                                        {openJobId === job.id && (
                                            <div className='absolute text-start right-0 w-32 bg-white border border-border-primary rounded-md shadow-lg z-10 px-3'>
                                                <button
                                                    onClick={() => navigate('/question-edit')}
                                                    className='flex items-center w-full py-3 text-sm text-start text-primary font-medium border-b border-border-primary'
                                                >
                                                    <Pencil className='mr-2 w-4 h-4 stroke-2' />{' '}
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate('/question-edit')}
                                                    className='flex items-center w-full py-3 text-sm text-text-gray font-medium'
                                                >
                                                    <Eye className='mr-2 w-4 h-4 stroke-2' /> View
                                                    More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Questions;
