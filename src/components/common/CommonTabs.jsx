import React, { useState } from 'react';

const CommonTabs = ({ tabs, className = '' }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

    return (
        <div className={`w-full ${className}`}>
            {/* Tab Navigation */}
            <div className='flex flex-wrap border-b border-border-primary sm:flex-row mt-5'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer border-b-2 ps-2 py-3 text-sm font-medium md:text-base text-left md:pr-10 transition-all ${
                            activeTab === tab.id
                                ? 'border-primary text-subtext-primary font-semibold'
                                : 'text-text-gray border-transparent'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className='mt-4'>
                {tabs.map((tab) => (
                    <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
                        <div className='p-6 text-base leading-relaxed text-body-color dark:text-dark-6'>
                            {tab.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommonTabs;
