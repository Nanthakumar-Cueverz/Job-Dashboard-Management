import React, { useState, useEffect } from 'react';
import SideBar from '../ui/SideBar';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
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
                <Header setIsOpen={setIsOpen} />
                <main className='p-3 lg:p-6'>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
