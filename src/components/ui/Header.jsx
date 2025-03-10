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

    // Custom mapping for paths
    const breadcrumbMap = {
        '': 'Job',
        'job-detail': 'Job Details',
        questions: 'Questions',
        candidates: 'Candidates',
    };

    // Generate breadcrumb paths dynamically
    const breadcrumbs = [{ name: 'Dashboard', href: '/' }];

    pathnames.forEach((path, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        breadcrumbs.push({ name: breadcrumbMap[path] || path, href });
    });

    return (
        <ul className='flex items-center text-white'>
            {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className='flex items-center'>
                    {index !== breadcrumbs.length - 1 ? (
                        <Link
                            to={breadcrumb.href}
                            className='text-base font-medium hover:text-primary'
                        >
                            {breadcrumb.name}
                        </Link>
                    ) : (
                        <span className='text-base font-medium'>{breadcrumb.name}</span>
                    )}
                    {index !== breadcrumbs.length - 1 && (
                        <span className='px-3 text-body-color dark:text-dark-6'>
                            <svg
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M16.2 8.55001L10.3781 2.64376C10.125 2.39064 9.73126 2.39064 9.47813 2.64376C9.22501 2.89689 9.22501 3.29064 9.47813 3.54376L14.2031 8.35314H2.25001C1.91251 8.35314 1.63126 8.63439 1.63126 8.97189C1.63126 9.30939 1.91251 9.61876 2.25001 9.61876H14.2594L9.47813 14.4844C9.22501 14.7375 9.22501 15.1313 9.47813 15.3844C9.59063 15.4969 9.75938 15.5531 9.92813 15.5531C10.0969 15.5531 10.2656 15.4969 10.3781 15.3563L16.2 9.45001C16.4531 9.19689 16.4531 8.80314 16.2 8.55001Z'
                                    fill='currentColor'
                                />
                            </svg>
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
};
