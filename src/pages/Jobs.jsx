import React, { useState } from 'react';
import CircleDot from '../assets/icons/circle-dot.svg?react';
import Location from '../assets/icons/map-pin.svg?react';
import Pagination from '../components/common/Pagination';
import jobListings from '../Content.jsx';
import PostJobCommon from '../components/common/PostJobCommon.jsx';
import { useNavigate } from 'react-router-dom';

const colorClasses = {
    gray: 'bg-gray-800',
    green: 'bg-green-800',
    yellow: 'bg-yellow-800',
    red: 'bg-red-800',
    orange: 'bg-orange-800',
};
const Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;
    // Calculate the displayed jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobListings.length / jobsPerPage);
    return (
        <div className='py-10 px-10'>
            <div>
                <PostJobCommon url='/create-job' />
                <div>
                    <JobsCard jobs={currentJobs} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Jobs;

const JobsCard = ({ jobs }) => {
    return (
        <div className='py-10'>
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className='p-4 border border-border-primary rounded-md mb-5 last:mb-0'
                >
                    <div className='pb-4 border-b border-border-primary flex justify-between align-middle'>
                        <div className='flex items-center gap-x-4'>
                            <CircleDot
                                className={`${
                                    colorClasses[job.color]
                                } text-white p-2 rounded-sm w-12 h-12`}
                            />
                            <div>
                                <h2 className='text-md font-semibold text-subtext-primary'>
                                    {job.title}
                                </h2>
                                <div className='flex align-middle gap-x-3 items-center'>
                                    <h6 className='text-xs text-[#707070] font-medium'>
                                        Company Name
                                    </h6>
                                    <span className='text-[10px] px-3 py-[4px] bg-blue-background text-text-primary rounded-full'>
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-x-2'>
                            <Location className='text-icon-primary' />
                            <div className='text-end'>
                                <h2 className='text-subtext-primary font-medium'>{job.location}</h2>
                                <p className='text-text-neutral font-medium text-sm'>{job.time}</p>
                            </div>
                        </div>
                    </div>
                    <ul className='mt-2 list-disc pl-5 text-gray-700'>
                        <JobDescription job={job} />
                    </ul>
                </div>
            ))}
        </div>
    );
};
const JobDescription = ({ job }) => {
    const navigate = useNavigate();

    return (
        <>
            {/* First description - Full text */}
            <li className='text-sm text-paragraph font-light pb-2'>{job.descriptions[0]}</li>

            {/* Second description - Truncated with "View More" */}
            <li className='text-sm text-paragraph font-light pb-2 relative'>
                <span className='line-clamp-2'>
                    {job.descriptions[1].substring(0, 120)}...
                    <button
                        className='text-blue-500 font-normal ml-2  bg-white'
                        onClick={() => navigate('/job-detail')}
                    >
                        View More
                    </button>
                </span>
            </li>
        </>
    );
};
