import React, { useState } from 'react';
import CircleDot from '../assets/icons/circle-dot.svg?react';
import Location from '../assets/icons/map-pin.svg?react';
import Pagination from '../components/common/Pagination';
import jobListings from '../Content.jsx';
import PostJobCommon from '../components/common/PostJobCommon.jsx';
import { useNavigate } from 'react-router-dom';
import EmptySection from '../components/common/EmptySection.jsx';

const colorClasses = {
    gray: 'bg-gray-800',
    green: 'bg-green-800',
    yellow: 'bg-yellow-800',
    red: 'bg-red-800',
    orange: 'bg-orange-800',
};
const Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    // Calculate the displayed jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobListings.length / jobsPerPage);
    return (
        <div className='p-0 lg:py-10 lg:px-10'>
            {jobListings.length > 0 ? (
                <div>
                    <PostJobCommon url='/interviewai/create-job' />
                    <div>
                        <JobsCard jobs={currentJobs} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            ) : (
                <EmptySection />
            )}
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
                    className='p-4 border border-border-primary rounded-2xl lg:shadow-none  shadow-[0px_0px_50px_0px_rgba(204,204,204,0.26)] lg:rounded-md  mb-5 last:mb-0'
                >
                    <div className='p-0 lg:pb-4 border-0 lg:border-b border-border-primary block lg:flex justify-between align-middle'>
                        <div className='flex items-start lg:items-center gap-x-4'>
                            <CircleDot
                                className={`${
                                    colorClasses[job.color]
                                } text-white p-2 rounded-sm w-12 h-12 mt-1 lg:mt-0`}
                            />
                            <div>
                                <a
                                    href='/interviewai/job-detail'
                                    className='lg:text-md font-medium text-lg lg:font-semibold text-subtext-primary'
                                >
                                    {job.title}
                                </a>
                                <div className='flex align-middle gap-x-3 items-center'>
                                    <h6 className='text-xs text-black lg:text-[#707070] font-medium'>
                                        Company Name
                                    </h6>
                                    <span className='text-[10px] px-3 py-[4px] bg-blue-background text-text-primary rounded-full hidden lg:block '>
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-x-2 pl-16'>
                            <Location className='text-icon-primary lg:block hidden' />
                            <div className='text-start lg:text-end'>
                                <h2 className='text-neutral lg:text-subtext-primary text-sm lg:text-md font-normal lg:font-medium'>
                                    {job.location}
                                </h2>
                                <div className='space-x-2 pt-2'>
                                    <p className='inline-block py-1 px-2.5 text-[10px] font-medium lg:hidden bg-green-100 text-green-900 rounded-md'>
                                        {job.time}
                                    </p>
                                    <span className='text-[10px] px-3 py-[4px] bg-blue-background lg:hidden inline-block w-fit text-text-primary rounded-md'>
                                        {job.jobType}
                                    </span>
                                </div>
                                <p className='text-text-neutral font-medium text-sm lg:block hidden'>
                                    {job.time}
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul className='mt-2 list-disc pl-5 text-gray-700 hidden lg:block'>
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
