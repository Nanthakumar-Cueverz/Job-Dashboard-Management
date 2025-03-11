import React, { useEffect, useState } from 'react';
import { data, getStatusClass } from '../../Content';
import ReusableDataTable from '../common/ReusableDataTable';
import ModalPopup from '../common/ModalPopup';
import ScheduleCall from './ScheduleCall';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, ChevronRight } from 'lucide-react';
const CandidateTables = () => {
    const navigate = useNavigate();
    const [scheduleCall, setScheduleCall] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [scheduledStatus, setScheduledStatus] = useState({});
    const handleScheduleClick = (candidate) => {
        setSelectedCandidate(candidate);
        setScheduleCall(true);
    };
    useEffect(() => {
        const updatedStatus = {};
        data.forEach((candidate) => {
            const storedSchedule = sessionStorage.getItem(`scheduled_${candidate.email}`);
            if (storedSchedule) {
                updatedStatus[candidate.email] = JSON.parse(storedSchedule);
            }
        });
        setScheduledStatus(updatedStatus);
    }, []);
    const handleCloseModal = () => {
        setScheduleCall(false);

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
            name: 'Score',
            selector: (row) => (
                <button
                    className='p-2 rounded-md  flex items-center'
                    onClick={() => navigate('/candidate-score-card')}
                >
                    {row.score}
                    <ChevronRight className='w-5 h-5 bg-green-100 text-primary-green rounded-full p-0.5 ml-1' />
                </button>
            ),
        },
        {
            name: 'Action',
            cell: (row) => (
                <button className='p-2 rounded-md hover:bg-gray-100'>
                    <EllipsisVertical className='w-5 h-5 text-gray-600' />
                </button>
            ),
        },
        {
            name: 'Schedule',
            cell: (row) => {
                const isScheduled = scheduledStatus[row.email];
                return (
                    <button
                        className={`px-4 py-2 rounded-md whitespace-nowrap ${
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
        <div className=''>
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
    );
};

export default CandidateTables;
