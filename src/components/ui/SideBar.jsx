import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for active menu detection
import X from '@icons/x.svg?react';
import Jobs from '@icons/briefcase-business.svg?react';
import Questions from '@icons/circle-help.svg?react';
import Candidates from '@icons/user.svg?react';
import Interviews from '@icons/interview.svg?react';
import Logout from '@icons/log-out.svg?react';
import profile from '@images/profile.jpg';

const menuItems = [
    { name: 'Jobs', icon: Jobs, link: '/interviewai' },
    { name: 'Questions', icon: Questions, link: '/interviewai/questions' },
    { name: 'Candidates', icon: Candidates, link: '/interviewai/candidates' },
    { name: 'Interviews', icon: Interviews, link: '/interviewai/interview' },
];

const SideBar = () => {
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem('authToken');
        window.location.href = '/interviewai/login';
    };
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current page URL

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 h-screen transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            {/* Sidebar Header */}
            <div className='flex items-center justify-between p-5 border-b border-neutral-200'>
                <div className='flex items-center align-middle py-3'>
                    <img src={profile} alt='' className='w-10 h-10 rounded-full' />
                    <div className='pl-2'>
                        <h2 className='text-md text-black font-semibold'>John Mathive</h2>
                        <h6 className='text-xs text-black font-normal'>HR - Manager</h6>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className='lg:hidden'>
                    <X size={24} />
                </button>
            </div>

            {/* Sidebar Links */}
            <nav className='p-4 space-y-4'>
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.link;

                    return (
                        <a
                            key={index}
                            href={item.link}
                            className={`flex items-center border-l-4 space-x-5 p-3 transition-colors border-y-transparent hover:border-y-transparent  ${
                                isActive
                                    ? 'bg-blue-background text-primary border-y-2 border-y-white' // Active Page
                                    : 'text-primary-gray hover:bg-blue-background border-y-2 hover:text-primary border-transparent hover:border-l-primary'
                            }`}
                        >
                            <item.icon size={20} className='stroke-1' />
                            <span>{item.name}</span>
                        </a>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className='absolute bottom-0 w-full'>
                <div className='w-full border-t border-neutral-200 p-4'>
                    <button
                        onClick={handleLogout}
                        className='flex items-center space-x-5 p-3 text-primary-gray hover:bg-primary hover:text-white rounded'
                    >
                        <Logout />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
