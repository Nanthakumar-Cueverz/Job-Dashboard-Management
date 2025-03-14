import React, { useState } from 'react';
import EmptySection from '../components/common/EmptySection';
import { EllipsisVertical, Search } from 'lucide-react';
import ReusableDataTable from '../components/common/ReusableDataTable';

const Candidates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const data = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '9876543210',
            date: '2025-03-10',
            time: '10:00 AM',
            jobTitle: 'Software Engineer',
            score: '-',
            status: 'Cancelled',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543220',
            date: '2024-03-11',
            time: '02:00 PM',
            jobTitle: 'UX Designer',
            score: '-',
            status: 'Interview Scheduled',
        },
        {
            id: 3,
            name: 'Alice Brown',
            email: 'alice@example.com',
            phone: '9876543230',
            date: '2024-03-12',
            time: '11:30 AM',
            jobTitle: 'Data Scientist',
            score: '68%',
            status: 'Interview Completed',
        },
    ];

    const columns = [
        { name: 'Name', selector: (row) => row.name, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Phone Number', selector: (row) => row.phone, sortable: true },
        { name: 'Date', selector: (row) => row.date, sortable: true },
        { name: 'Time', selector: (row) => row.time, sortable: true },
        { name: 'Job Title', selector: (row) => row.jobTitle, sortable: true },
        {
            name: 'Action',
            cell: (row) => (
                <div className='flex items-center gap-2'>
                    <button className='p-2 rounded-md hover:bg-gray-100'>
                        <EllipsisVertical className='w-5 h-5 text-gray-600' />
                    </button>
                </div>
            ),
        },
    ];

    // Filtering the data based on search and date
    const filteredData = data.filter((item) => {
        const matchesSearch = Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        );

        const matchesDate = selectedDate ? item.date === selectedDate : true;

        return matchesSearch && matchesDate;
    });

    return (
        <div className='max-w-6xl mx-auto'>
            {/* Search and Date Filter Section */}
            <div className='block md:flex justify-between items-center mb-4'>
                <div>
                    <h2 className='font-semibold pb-5 md:pb-0'>Upcoming Interviews</h2>
                </div>
                <div className='block md:flex justify-between items-center space-x-5'>
                    {/* Search Bar */}
                    <div className='w-full md:w-64'>
                        <label className='text-xs text-subtext-primary font-semibold  pb-2 md:hidden'>
                            Search Candidate
                        </label>
                        <div className=' relative'>
                            <input
                                type='email'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='info@yourmai.com'
                                className='w-full bg-transparent rounded-md border border-border-primary py-[10px] pr-3 pl-12 text-text-neutral outline-none '
                            />
                            <span className='absolute top-1/2 left-4 -translate-y-1/2'>
                                <Search className='text-text-neutral w-4 h-4' />
                            </span>
                        </div>
                    </div>
                    <div className='w-full md:w-fit relative pt-3 md:pt-0'>
                        <label className='text-xs text-subtext-primary font-semibold pb-2 lg:hidden'>
                            Select Date
                        </label>
                        <input
                            type='date'
                            placeholder='DD-MM-YYYY'
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className='bg-transparent uppercase border-border-primary rounded-md border border-stroke w-full py-[10px] px-5 text-text-neutral  outline-none transition'
                        />
                    </div>
                </div>
            </div>

            {filteredData.length === 0 ? (
                <EmptySection title='No Candidates Available' />
            ) : (
                <ReusableDataTable columns={columns} data={filteredData} />
            )}
        </div>
    );
};

export default Candidates;
