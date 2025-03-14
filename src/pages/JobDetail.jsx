import React from 'react';
import CircleDot from '../assets/icons/circle-dot.svg?react';
import Location from '../assets/icons/map-pin.svg?react';
import { OptionsButton } from './Jobs';
import CommonTabs from '../components/common/CommonTabs';
import CandidateTables from '../components/ui/CandidateTables';
import CandidateQuestions from '../components/ui/CandidateQuestions';
import { Clock } from 'lucide-react';

const JobDetail = () => {
    const tabData = [
        {
            id: 'candidates',
            label: 'Candidates',
            content: <CandidateTables />,
        },
        {
            id: 'candidates-questions',
            label: 'Candidates Questions',
            content: (
                <CandidateQuestions
                    className='bg-primary-background p-5'
                    classNameInner='bg-white'
                    checkBox='hidden'
                    ListNumbers='block'
                    title='Candidates Questions'
                />
            ),
        },
    ];
    return (
        <div className='p-0 lg:p-5 max-w-6xl mx-auto'>
            <div className='p-5 lg:p-5 shadow rounded-md mb-5 last:mb-0'>
                <div className='p-0 lg:pb-4 border-b pb-4 lg:border-b border-border-primary block lg:flex justify-between align-middle'>
                    <div className='block lg:flex items-start lg:items-center gap-x-4'>
                        <div className='w-full lg:w-fit inline-flex justify-between lg:hidden'>
                            <CircleDot className='bg-black text-white p-2 rounded-sm w-12 h-12 mt-1 lg:mt-0' />
                            <div className='block lg:hidden'>
                                <OptionsButton />
                            </div>
                        </div>
                        <CircleDot className='bg-black text-white p-2 rounded-sm w-12 h-12 mt-1 lg:mt-0 hidden lg:block' />
                        <div>
                            <div className='lg:hidden inline-flex w-full items-center space-x-4 justify-between gap-x-4'>
                                <h6 className='text-sm text-black font-medium'>Google</h6>
                                <p className='flex text-xs items-center font-medium bg-table-background px-2 py-1 rounded-md lg:hidden text-subtext-primary'>
                                    <Clock className='w-3 h-3 mr-2' />5 hours ago
                                </p>
                            </div>
                            <a
                                href='/interviewai/job-detail'
                                className='lg:text-md font-medium text-lg lg:font-semibold text-subtext-primary'
                            >
                                Senior Frontend Developer
                            </a>
                            <div className='flex align-middle gap-x-3 items-center'>
                                <h6 className='text-xs text-black lg:text-[#707070] font-medium hidden lg:block'>
                                    Company Name
                                </h6>
                                <span className='text-[10px] px-3 py-[4px] bg-blue-background text-text-primary rounded-full hidden lg:block '>
                                    Full Time
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-x-2'>
                        <Location className='text-icon-primary lg:block w-6 h-6 hidden' />
                        <div className='text-start lg:text-end w-full'>
                            <div className='flex justify-between w-full'>
                                <h2 className='text-neutral lg:text-subtext-primary text-sm lg:text-md font-normal lg:font-medium'>
                                    Marina East, Singapore
                                </h2>
                                <h6 className='text-[10px] px-3 py-[4px] bg-blue-background lg:hidden inline-block w-fit text-text-primary rounded-md'>
                                    Full Time
                                </h6>
                            </div>
                            <p className='text-text-neutral font-medium text-sm lg:block hidden'>
                                5 hours ago
                            </p>
                        </div>
                        <div className='hidden lg:block'>
                            <OptionsButton />
                        </div>
                    </div>
                </div>
                <div className='pt-5 lg:pt-5'>
                    <div>
                        <h2 className='text-subtext-primary text-lg font-semibold p-2 mb-3 bg-table-background'>
                            Description
                        </h2>
                    </div>
                    <div className='pb-5'>
                        <h2 className='subheading text-subtext-primary'>About this role</h2>
                        <p className='para py-2'>
                            A Data Scientist is responsible for transforming raw data into
                            actionable insights that drive strategic business decisions.A Data
                            Scientist is responsible for transforming raw data into actionable
                            insights that drive strategic business decisions.A Data Scientist is
                            responsible for transforming raw data into actionable insights that
                            drive strategic business decisions.
                        </p>
                    </div>
                    <div className='pb-5'>
                        <h2 className='subheading text-subtext-primary'>Responsibility</h2>
                        <ul className='para list-disc py-2 px-4'>
                            <li>
                                Translate UI/UX designs and wireframes into functional and visually
                                appealing web pages and applications using HTML, CSS, and
                                JavaScript.
                            </li>
                            <li>Develop and maintain user-facing features for web applications.</li>
                            <li>Ensure the technical feasibility of UI/UX designs. </li>
                            <li>Collaborate with UX/UI designers to implement design concepts. </li>
                            <li>Design and develop graphics. </li>
                            <li>Develop and maintain user-facing features for web applications.</li>
                        </ul>
                    </div>
                    <div className='pb-5'>
                        <h2 className='subheading text-subtext-primary'>Technical Skills</h2>
                        <ul className='para list-disc py-2 px-4'>
                            <li>Strong analytical and problem-solving skills.</li>
                            <li>Ability to clearly communicate technical concepts.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <CommonTabs tabs={tabData} />
            </div>
        </div>
    );
};

export default JobDetail;
