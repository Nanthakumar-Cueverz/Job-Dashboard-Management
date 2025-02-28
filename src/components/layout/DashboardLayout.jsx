import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <>
            <h1>Header</h1>
            {children}
            <h1>Footer</h1>
        </>
    );
};

export default DashboardLayout;
