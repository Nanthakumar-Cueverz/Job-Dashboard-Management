import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import X from '@icons/x.svg?react';
import Jobs from '@icons/briefcase-business.svg?react';
import Questions from '@icons/circle-help.svg?react';
import Candidates from '@icons/user.svg?react';
import Interviews from '@icons/interview.svg?react';
import Logout from '@icons/log-out.svg?react';
import profile from '@images/profile.jpg';

const menuItems = [
    { name: 'Jobs', icon: Jobs, path: '/' },
    { name: 'Questions', icon: Questions, path: '/questions' },
    { name: 'Candidates', icon: Candidates, path: '/candidates' },
    { name: 'Interviews', icon: Interviews, path: '/interview' },
];

const SideBar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem('authToken');
        navigate('/login');
        setIsOpen(false);
    };
    const isActivePostJob = location.pathname === '/create-job';
    return (
        <div
            className={`fixed inset-y-0 z-50 left-0 w-64 bg-white border-r border-neutral-200 h-screen transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 
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
            <nav className='space-y-4'>
                <button
                    onClick={() => {
                        navigate('/create-job');
                        setIsOpen(false);
                    }}
                    className={`flex items-center gap-x-3 py-5 px-5 border-b w-full border-border-primary transition-colors 
                        ${
                            isActivePostJob
                                ? ' text-primary font-medium'
                                : 'hover:bg-gray-100 text-gray-600'
                        }`}
                >
                    <Plus className={`rounded-full h-10 w-10 p-2 bg-primary text-white`} />
                    <span className={`${isActivePostJob ? 'text-primary' : 'text-gray-600'}`}>
                        Post a Job
                    </span>
                </button>
                <div className='px-5'>
                    {menuItems.map((item, index) => {
                        const isActiveInner = location.pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center border-l-4 space-x-5 p-3 transition-colors border-y-transparent hover:border-y-transparent w-full  ${
                                    isActiveInner
                                        ? 'bg-blue-background text-primary border-y-2 border-y-white'
                                        : 'text-primary-gray hover:bg-blue-background border-y-2 hover:text-primary border-transparent hover:border-l-primary'
                                }`}
                            >
                                <item.icon size={20} className='stroke-1' />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Logout Button */}
            <div className='absolute bottom-10 lg:bottom-0 w-full'>
                <div className='w-full border-t border-neutral-200 p-4'>
                    <button
                        onClick={handleLogout}
                        className='flex items-center space-x-5 p-3 w-full text-primary-gray hover:bg-primary hover:text-white rounded'
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
