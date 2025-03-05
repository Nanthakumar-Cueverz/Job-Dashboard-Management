import React, { useEffect, useState } from 'react';
import DotIcon from '../assets/icons/ellipsis-vertical.svg?react';
import PostJobCommon from '../components/common/PostJobCommon';
import CircleDot from '../assets/icons/circle-dot.svg?react'; // Ensure the path is correct
import Location from '../assets/icons/map-pin.svg?react';
import ReusableDataTable from '../components/common/ReusableDataTable';
import { data, getStatusClass } from '../Content';
import ModalPopup from '../components/common/ModalPopup';
import ScheduleCall from '../components/ui/ScheduleCall';

const JobDetail = () => {
    const [scheduleCall, setScheduleCall] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [scheduledStatus, setScheduledStatus] = useState({});

    useEffect(() => {
        // Load scheduled status from sessionStorage on component mount
        const updatedStatus = {};
        data.forEach((candidate) => {
            const storedSchedule = sessionStorage.getItem(`scheduled_${candidate.email}`);
            if (storedSchedule) {
                updatedStatus[candidate.email] = JSON.parse(storedSchedule);
            }
        });
        setScheduledStatus(updatedStatus);
    }, []);

    const handleScheduleClick = (candidate) => {
        setSelectedCandidate(candidate);
        setScheduleCall(true);
    };

    const handleCloseModal = () => {
        setScheduleCall(false);

        // Refresh button status after scheduling
        const updatedStatus = {};
        data.forEach((candidate) => {
            const storedSchedule = sessionStorage.getItem(`scheduled_${candidate.email}`);
            if (storedSchedule) {
                updatedStatus[candidate.email] = JSON.parse(storedSchedule);
            }
        });
        setScheduledStatus(updatedStatus);
    };

    const columns = [
        { name: 'Candidate Name', selector: (row) => row.name, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Phone Number', selector: (row) => row.phone, sortable: true },
        {
            name: 'Status',
            selector: (row) => row.status,
            cell: (row) => <span className={getStatusClass(row.status)}>{row.status}</span>,
        },
        {
            name: 'Action',
            cell: (row) => (
                <button className='p-2 rounded-md hover:bg-gray-100'>
                    <DotIcon className='w-5 h-5 text-gray-600' />
                </button>
            ),
        },
        {
            name: 'Schedule',
            cell: (row) => {
                const isScheduled = scheduledStatus[row.email];
                return (
                    <button
                        className={`px-4 py-2 rounded-md ${
                            isScheduled ? 'bg-green-500 text-white' : 'bg-primary text-white'
                        }`}
                        onClick={() => handleScheduleClick(row)}
                    >
                        {isScheduled ? 'Reschedule' : 'Schedule'}
                    </button>
                );
            },
        },
    ];

    return (
        <div className='py-10 px-10'>
            <div>
                <PostJobCommon url='/interviewai/create-job' />
            </div>
            <div className='pt-10'>
                <div className='p-10 shadow rounded-md mb-5 last:mb-0'>
                    <div className='pb-4 border-b border-border-primary flex justify-between align-middle items-center'>
                        <div className='flex items-center gap-x-4'>
                            <CircleDot className='bg-black text-white p-2 rounded-sm w-12 h-12' />
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
                                actionable insights that drive strategic business decisions.
                            </p>
                        </div>
                        <div className='pb-5'>
                            <h2 className='subheading'>Responsibility</h2>
                            <ul className='para list-disc py-2 px-4'>
                                <li>Design user journeys across multiple devices.</li>
                                <li>Identify design problems through user journey analysis.</li>
                                <li>Develop wireframes and prototypes.</li>
                            </ul>
                        </div>
                        <div className='pb-5'>
                            <h2 className='subheading'>Technical Skills</h2>
                            <ul className='para list-disc py-2 px-4'>
                                <li>Strong analytical and problem-solving skills.</li>
                                <li>Ability to clearly communicate technical concepts.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className='pt-10'>
                <h2 className='text-xl font-semibold mb-4'>Matching Candidates</h2>
                <ReusableDataTable columns={columns} data={data} />
                <ModalPopup width='700px' isOpen={scheduleCall} onClose={handleCloseModal}>
                    {selectedCandidate && (
                        <ScheduleCall
                            selectedCandidate={selectedCandidate}
                            onClose={handleCloseModal}
                        />
                    )}
                </ModalPopup>
            </div>
        </div>
    );
};

export default JobDetail;
