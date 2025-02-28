import React, { useState, useEffect } from 'react';
import SideBar from '../ui/SideBar';

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when sidebar is open (only for mobile screens)
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
            {' '}
            {/* Full height and hidden overflow */}
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='flex-1 flex flex-col overflow-auto'>
                {' '}
                {/* Allow scrolling only on the main content */}
                <main className='p-6'>{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
