import React, { lazy } from 'react';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
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
];

export default routes;
