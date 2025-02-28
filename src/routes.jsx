import React, { lazy } from 'react';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));

const routes = [
    {
        path: '/',
        element: (
            <DashboardLayout>
                <Dashboard />
            </DashboardLayout>
        ),
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/login',
        element: <Register />,
    },
    {
        path: '/jobs',
        element: (
            <DashboardLayout>
                <Jobs />
            </DashboardLayout>
        ),
    },
];

export default routes;
