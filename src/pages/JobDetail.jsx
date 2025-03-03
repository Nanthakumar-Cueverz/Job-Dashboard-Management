import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PostJobCommon from '../components/common/PostJobCommon';
import CircleDot from '@icons/circle-dot.svg?react';
import Location from '@icons/map-pin.svg?react';
import DotIcon from '@icons/ellipsis-vertical.svg?react';
import ReusableDataTable from '../components/common/ReusableDataTable';
const JobDetail = () => {
    const columns = [
        { title: 'Candidate Name', data: 'name' },
        { title: 'Email', data: 'email' },
        { title: 'Phone Number', data: 'phone' },
        {
            title: 'Status',
            data: 'status',
            render: function (data) {
                let colorClass = 'text-table-text';
                if (data === 'In Progress') colorClass = 'text-yellow-500';
                else if (data === 'Completed') colorClass = 'text-green-500';
                else if (data === 'Invited') colorClass = 'text-primary';
                return `<span class="${colorClass} font-normal">${data}</span>`;
            },
        },
        {
            title: 'Action',
            data: null,
            render: function () {
                return ReactDOMServer.renderToString(
                    <button className='px-3 py-1 rounded-md'>
                        <DotIcon className='text-icon-primary w-5 h-5' />
                    </button>,
                );
            },
        },
        {
            title: 'Schedule',
            data: null,
            render: function (data, type, row) {
                return `
                    <button class='bg-primary text-white px-5 py-2 rounded-md mr-2'>Schedule</button>
                `;
            },
        },
    ];

    const data = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '9876543210',
            status: 'Invited',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543220',
            status: 'In Progress',
        },
        {
            id: 3,
            name: 'Alice Brown',
            email: 'alice@example.com',
            phone: '9876543230',
            status: 'Completed',
        },
        {
            id: 4,
            name: 'Bob Williams',
            email: 'bob@example.com',
            phone: '9876543240',
            status: 'Available',
        },
        {
            id: 5,
            name: 'Jhon snow',
            email: 'Jhon snow@gmail.com',
            phone: '9876543240',
            status: 'Available',
        },
        {
            id: 6,
            name: 'Jhon snow',
            email: 'Jhon snow@gmail.com',
            phone: '9876543240',
            status: 'Available',
        },
    ];
    return (
        <div className='py-10 px-10'>
            <div>
                <PostJobCommon />
            </div>
            <div className='pt-10'>
                <div className='p-10 shadow rounded-md mb-5 last:mb-0'>
                    <div className='pb-4 border-b border-border-primary flex justify-between align-middle items-center'>
                        <div className='flex items-center gap-x-4'>
                            <CircleDot className={`bg-black text-white p-2 rounded-sm w-12 h-12`} />
                            <div>
                                <h2 className='text-[16px] font-semibold text-subtext-primary leading-8'>
                                    Data Scientist
                                </h2>
                                <div className='flex align-middle gap-x-3 items-center'>
                                    <h6 className='text-xs text-[#707070] font-medium'>Github</h6>
                                    <span className='text-[10px] px-3 py-[4px] bg-blue-background text-text-primary rounded-full'>
                                        Full Time
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-x-2'>
                            <Location className='text-icon-primary' />
                            <div className='text-end'>
                                <h2 className='text-subtext-primary text-[12px] font-medium'>
                                    Marina East, Singapore
                                </h2>
                                <p className='text-text-neutral font-medium text-xs'>5 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className='pt-10'>
                        <div className='pb-5'>
                            <h2 className='subheading'>About this role</h2>
                            <p className='para py-2'>
                                A Data Scientist is responsible for transforming raw data into
                                actionable insights that drive strategic business decisions. This
                                role involves leveraging statistical analysis, machine learning, and
                                data visualization techniques to interpret complex datasets, uncover
                                trends, and predict future outcomes.
                            </p>
                        </div>
                        <div className='pb-5'>
                            <h2 className='subheading'>Responsibility</h2>
                            <ul className='para list-disc py-2 px-4'>
                                <li>
                                    Create design and user journey on every features and
                                    product/business units across multiples devices (Web+App)
                                </li>
                                <li>
                                    Identifying design problems through user journey and devising
                                    elegant solutions
                                </li>
                                <li>
                                    Develop low and hi fidelity designs, user experience flow, &
                                    prototype, translate it into highly-polished
                                </li>
                                <li>visual composites following style and brand guidelines.</li>
                                <li>
                                    Brainstorm and works together with Design Lead, UX Engineers,
                                    and PMs to execute a design sprint on specific story or task
                                </li>
                            </ul>
                        </div>
                        <div className='pb-5'>
                            <h2 className='subheading'>Technical Skills</h2>
                            <ul className='para list-disc py-2 px-4'>
                                <li>
                                    Analytical Skills: Excellent problem-solving skills and a strong
                                    analytical mindset to interpret complex data sets.
                                </li>
                                <li>
                                    Communication Skills: Ability to clearly articulate complex
                                    ideas and technical findings to diverse audiences.
                                </li>
                                <li>
                                    Experience: Previous experience in data analytics, machine
                                    learning, or related roles is highly desirable.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Data Table */}
            <div className='pt-10'>
                <h2 className='text-xl font-semibold mb-4'>Matching Candidates</h2>
                <ReusableDataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default JobDetail;
