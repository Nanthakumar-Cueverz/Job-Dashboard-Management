import React from 'react';
import CircleDot from '../assets/icons/circle-dot.svg?react';
import Location from '../assets/icons/map-pin.svg?react';
const jobListings = [
    {
        id: 1,
        icon: CircleDot,
        color: 'gray',
        title: 'Data Scientist',
        location: 'Marina East, Singapore',
        time: '5 hours ago',
        jobType: 'Full Time',
        postedDate: '2023-08-15',
        descriptions: [
            'Analyze large datasets to extract meaningful insights.',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
            'Collaborate with engineers to deploy AI solutions into production.',
        ],
    },
    {
        id: 2,
        icon: CircleDot,
        color: 'green',
        title: 'Software Engineer',
        location: 'Marina West, Singapore',
        time: '1 day ago',
        jobType: 'Part Time',
        postedDate: '2023-08-14',
        descriptions: [
            'Design and implement scalable software solutions.',
            'Collaborate with designers to create user-friendly interfaces.',
            'Write clean, efficient, and maintainable code.',
        ],
    },
    {
        id: 3,
        icon: CircleDot,
        color: 'yellow',
        title: 'Product Manager',
        location: 'Marina North, Singapore',
        time: '2 days ago',
        jobType: 'Contract',
        postedDate: '2023-08-13',
        descriptions: [
            'Define product requirements and goals.',
            'Manage product development lifecycle.',
            'Communicate with stakeholders and clients.',
        ],
    },
    {
        id: 4,
        icon: CircleDot,
        title: 'UX Designer',
        color: 'red',
        location: 'Marina South, Singapore',
        time: '3 days ago',
        jobType: 'Full Time',
        postedDate: '2023-08-12',
        descriptions: [
            'Create user-centered designs for web and mobile applications.',
            'Conduct user research and usability testing.',
            'Collaborate with development teams to implement designs.',
        ],
    },
    {
        id: 5,
        icon: CircleDot,
        color: 'orange',
        title: 'Marketing Specialist',
        location: 'Marina Central, Singapore',
        time: '4 days ago',
        jobType: 'Part Time',
        postedDate: '2023-08-11',
        descriptions: [
            'Develop and execute marketing strategies.',
            'Analyze market trends and competitor strategies.',
            'Create and implement marketing campaigns.',
        ],
    },
];
const colorClasses = {
    gray: 'bg-gray-800',
    green: 'bg-green-800',
    yellow: 'bg-yellow-800',
    red: 'bg-red-800',
    orange: 'bg-orange-800',
};
const Jobs = () => {
    return (
        <div className='py-10 px-10'>
            <div>
                <div className='w-full flex justify-end items-center'>
                    <button className='btn-fill px-10'>Post a Job</button>
                </div>
                <div>
                    <JobsCard />
                </div>
            </div>
        </div>
    );
};

export default Jobs;

const JobsCard = () => {
    return (
        <div className='py-10'>
            {jobListings.map((job) => (
                <div
                    key={job.id}
                    className='p-4 border border-border-primary rounded-md mb-5 last:mb-0'
                >
                    <div className='pb-4 border-b border-border-primary flex justify-between align-middle'>
                        <div className='flex items-center gap-x-4'>
                            <job.icon
                                className={`${
                                    colorClasses[job.color] || 'bg-gray-800'
                                } text-white p-2 rounded-sm w-12 h-12`}
                            />
                            <div>
                                <h2 className='text-md font-semibold text-subtext-primary'>
                                    {job.title}
                                </h2>
                                <div className='flex align-middle gap-x-3 items-center'>
                                    <h6 className='text-xs text-[#707070] font-medium'>Github</h6>
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
                        {job.descriptions.map((desc, index) => (
                            <li key={index} className='text-sm text-paragraph font-light pb-2'>
                                {desc}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
