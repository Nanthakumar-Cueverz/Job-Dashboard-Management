import React, { useState } from 'react';
import Upload from '@icons/upload.svg?react';
import Pdf from '@icons/pdf.svg?react';
import Cancel from '@icons/x.svg?react';
const UploadFiles = ({ onFileSelect, label, title, style }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file) => {
        if (!file) return;

        const validTypes = {
            'application/pdf': <Pdf className='text-red-500 h-6 w-6' />,
            'application/msword': <Pdf className='text-blue-500' size={24} />,
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': (
                <Pdf className='text-blue-500' size={24} />
            ),
        };

        if (!validTypes[file.type]) {
            setError('Only PDF or Word files are allowed.');
            setSelectedFile(null);
        } else {
            setError('');
            setSelectedFile({
                file,
                icon: validTypes[file.type],
                size: formatFileSize(file.size),
            });
            onFileSelect && onFileSelect(file);
        }
    };

    const formatFileSize = (size) => {
        return size < 1024 * 1024
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <>
            <label className='mb-2 block text-base font-medium text-black'>{label}</label>
            <div className='relative'>
                <label
                    htmlFor='file'
                    className='flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-[#3E9FFB0D] border-primary p-2'
                >
                    <div className='w-full'>
                        <div>
                            <input
                                type='file'
                                name='file'
                                id='file'
                                className='sr-only'
                                onChange={handleFileChange}
                            />
                            <span className='mx-auto mb-3 flex h-[50px] w-[50px] items-center justify-center'>
                                <Upload size={24} />
                            </span>
                            <div className='space-y-2 text-center'>
                                <h6 className='text-black text-sm font-medium'>{title}</h6>
                                <h6 className='text-xs text-text-neutral font-normal'>
                                    Support format : PDF or Word
                                </h6>
                            </div>
                        </div>
                        <div className='px-5 mt-5'>
                            {selectedFile && (
                                <div>
                                    <div className='mt-2 gap-3 py-2 px-4 w-full bg-white rounded-lg shadow'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex align-middle items-center gap-x-3'>
                                                <div>{selectedFile.icon}</div>
                                                <div>
                                                    <span className='text-xs text-gray-700 block font-semibold'>
                                                        {selectedFile.file.name}
                                                    </span>
                                                    <span className='text-xs text-gray-500'>
                                                        {selectedFile.size}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedFile(null)}
                                                className='text-black text-xs font-semibold ml-auto'
                                            >
                                                <Cancel className='text-black w-4 h-4 stroke-2' />
                                            </button>
                                        </div>
                                        <div className='bg-stroke dark:bg-dark-3 relative h-1.5 w-full rounded-2xl bg-[#3E9FFB4D]'>
                                            <div className='bg-primary absolute top-0 left-0 h-full w-1/2 rounded-2xl'></div>
                                        </div>
                                    </div>
                                    <div className={` ${style}`}>
                                        <div>
                                            <span className='text-text-neutral text-xs font-normal'>
                                                Uploading.......
                                            </span>
                                            {error && (
                                                <p className='text-red-500 text-sm mt-2'>{error}</p>
                                            )}
                                        </div>
                                        <div className='text-center'>
                                            <button className='btn-fill px-10 py-2 items-center text-center'>
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </label>
            </div>
        </>
    );
};

export default UploadFiles;
