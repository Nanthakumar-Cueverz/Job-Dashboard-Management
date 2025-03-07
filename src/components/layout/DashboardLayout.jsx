import React, { useState, useEffect } from 'react';
import SideBar from '../ui/SideBar';
import MenuIcon from '@icons/menu.svg?react';
const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className='flex h-screen overflow-hidden'>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex-1 flex flex-col overflow-auto'>
                <header className='flex items-center justify-between bg-white p-5 shadow-md lg:hidden'>
                    <button onClick={() => setIsOpen(true)}>
                        <MenuIcon />
                    </button>
                </header>
                <main className='p-3 lg:p-6'>{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
