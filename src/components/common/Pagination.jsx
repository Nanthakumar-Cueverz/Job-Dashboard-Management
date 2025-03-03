import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className='bg-white py-6 text-center'>
            <ul className='flex items-center justify-center gap-2'>
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-2 text-base font-medium ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-text-neutral border-gray-300'
                        }`}
                    >
                        &lt;
                    </button>
                </li>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handlePageChange(index + 1)}
                            className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-base font-medium ${
                                currentPage === index + 1
                                    ? 'bg-primary text-white border-primary'
                                    : 'text-text-gray border-text-neutral'
                            }`}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-2 text-base font-medium ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-none'
                                : 'text-text-neutral border-gray-300'
                        }`}
                    >
                        &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
