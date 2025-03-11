import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import MenuIcon from '@icons/menu.svg?react';

const Header = ({ setIsOpen }) => {
    const location = useLocation();

    const pageTitles = {
        '/': 'Job',
        '/questions': 'Questions',
        '/candidates': 'Candidates',
        '/job-detail': 'Job Detail',
        '/create-job': 'Create Job',
        '/edit-job-detail': 'Edit Job Detail',
        '/candidate-score-card': 'Candidate Score Card',
    };

    const title = pageTitles[location.pathname] || 'Dashboard';

    return (
        <header className='flex items-center justify-between px-20 py-5 shadow-md bg-gradient-to-r from-[#184A9D] to-[#3E9FFB]'>
            <button onClick={() => setIsOpen(true)} className='lg:hidden'>
                <MenuIcon />
            </button>

            <div>
                <h1 className='font-semibold text-white text-3xl'>{title}</h1>
                <Breadcrumb />
            </div>
        </header>
    );
};

export default Header;

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbMap = {
        candidates: 'Candidates',
        'candidate-score-card': 'Candidate Score Card',
    };

    const breadcrumbs = [{ name: 'Dashboard', href: '/' }];

    pathnames.forEach((path, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        breadcrumbs.push({ name: breadcrumbMap[path] || path, href });
    });

    return (
        <ul className='flex items-center text-white text-sm'>
            {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className='flex items-center'>
                    {index !== breadcrumbs.length - 1 ? (
                        <Link to={breadcrumb.href} className='hover:underline'>
                            {breadcrumb.name}
                        </Link>
                    ) : (
                        <span>{breadcrumb.name}</span>
                    )}
                    {index !== breadcrumbs.length - 1 && <span className='mx-2'>→</span>}
                </li>
            ))}
        </ul>
    );
};
