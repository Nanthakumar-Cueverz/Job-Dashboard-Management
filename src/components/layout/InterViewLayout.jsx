import React, { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import InterViewHeader from './InterViewHeader';
const InterViewLayout = ({ children }) => {
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
            <div className='flex-1 flex flex-col overflow-auto'>
                <InterViewHeader />
                <main className='p-3 lg:p-6'>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default InterViewLayout;
