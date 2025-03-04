import CircleDot from '@icons/circle-dot.svg?react';
import DotIcon from '@icons/ellipsis-vertical.svg?react';
const jobListings = [
    {
        id: 1,
        jobId: 'Job1RC',
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
        jobId: 'Job1RC',
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
        jobId: 'Job1RC',
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
        jobId: 'Job1RC',
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
        jobId: 'Job1RC',
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
export const columns = [
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
        cell: (row) => (
            <button className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark'>
                Schedule
            </button>
        ),
        // ignoreRowClick: true,
        // button: true,
    },
];

// Helper function for status colors
const getStatusClass = (status) => {
    if (status === 'In Progress') return 'text-yellow-500';
    if (status === 'Completed') return 'text-green-500';
    if (status === 'Invited') return 'text-primary';
    return 'text-gray-500';
};

export const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', status: 'Invited' },
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
];

export const Sectioncolumns = [
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
];

export default jobListings;
