import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import CircleDot from '../assets/icons/circle-dot.svg?react';
import Location from '../assets/icons/map-pin.svg?react';
import Pagination from '../components/common/Pagination';
import jobListings from '../Content.jsx';
import PostJobCommon from '../components/common/PostJobCommon.jsx';
import { useNavigate } from 'react-router-dom';
import EmptySection from '../components/common/EmptySection.jsx';
import DotIcon from '../assets/icons/ellipsis-vertical.svg?react';
import EditIcon from '../assets/icons/pencil.svg?react';
import DeleteIcon from '../assets/icons/trash-2.svg?react';
import ModalPopup from '../components/common/ModalPopup.jsx';
import CheckIcon from '../assets/icons/check.svg?react';
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
                        <div className='flex items-start lg:items-center gap-x-4 relative'>
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
                            <div className='block lg:hidden absolute -right-2 -top-2'>
                                <OptionsButton />
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
                            <div className='hidden md:block'>
                                <OptionsButton />
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

const OptionsButton = ({ onEdit, onDelete }) => {
    const [deleteJobsConfirm, setDeleteJobsConfirm] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='relative inline-block'>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <DotIcon />
                </button>
                {isOpen && (
                    <div className='absolute text-start right-0  w-32 bg-white border border-border-primary  rounded-md shadow-lg z-10 px-3'>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onEdit && onEdit();
                            }}
                            className='flex items-center w-full py-3 text-sm text-start text-primary font-medium border-b border-border-primary'
                        >
                            <EditIcon className='mr-2 w-4 h-4 stroke-2 ' /> Edit
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setDeleteJobsConfirm(true);
                            }}
                            className='flex items-center w-full py-3 text-sm text-red-500 font-medium'
                        >
                            <DeleteIcon className='mr-2 w-4 h-4 stroke-2 ' /> Delete
                        </button>
                    </div>
                )}
            </div>
            <ModalPopup
                mobileWidth='350px'
                desktopWidth='400px'
                isOpen={deleteJobsConfirm}
                onClose={() => setDeleteJobsConfirm(false)}
            >
                <div className='text-center px-5'>
                    <div className='pb-5 border-b border-border-primary space-y-2'>
                        <h2 className='text-black text-sm font-medium'>Delete Job Confirmation</h2>
                        <p className='para'>
                            Are you sure you want to delete this job? This action cannot be undone.
                        </p>
                    </div>
                    <div className='pt-5 space-x-5 flex items-center justify-center'>
                        <button className='modal-secondary-btn'>Cancel</button>
                        <button
                            onClick={() => {
                                setDeleteJobsConfirm(false);
                                toast.custom(
                                    (t) => (
                                        <div className='bg-green-200 text-primary-green px-5 flex items-center rounded-md whitespace-nowrap text-xs py-3'>
                                            <CheckIcon className='bg-primary-green text-white rounded-full p-0.5 mr-2 h-4 w-4 stroke-3' />
                                            The job has been deleted successfully.
                                        </div>
                                    ),
                                    {
                                        duration: 5000,
                                    },
                                );
                            }}
                            className='modal-btn-fill bg-red-500'
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </ModalPopup>
        </>
    );
};
