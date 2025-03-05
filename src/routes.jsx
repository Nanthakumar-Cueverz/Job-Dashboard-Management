import React, { lazy } from 'react';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import JobDetail from './pages/JobDetail.jsx';
import InterviewPage from './pages/InterviewPage.jsx';
import Candidates from './pages/Candidates.jsx';
import Questions from './pages/Questions.jsx';
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

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
        path: '/interview',
        element: <InterviewPage />,
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
        path: '/candidates',
        element: (
            <DashboardLayout>
                <Candidates />
            </DashboardLayout>
        ),
    },
    {
        path: '/questions',
        element: (
            <DashboardLayout>
                <Questions />
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
