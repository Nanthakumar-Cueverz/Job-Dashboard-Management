import React, { lazy } from 'react';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import JobDetail from './pages/JobDetail.jsx';
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));

const routes = [
    {
        path: '/create-job',
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
        path: '/job-detail',
        element: (
            <DashboardLayout>
                <JobDetail />
            </DashboardLayout>
        ),
    },
    {
        path: '/',
        element: (
            <DashboardLayout>
                <Jobs />
            </DashboardLayout>
        ),
    },
];

export default routes;
