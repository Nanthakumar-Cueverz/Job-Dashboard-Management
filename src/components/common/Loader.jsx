import React from 'react';
import { Oval } from 'react-loader-spinner';
const Loader = () => {
    return (
        <div className='relative flex justify-center items-center mt-5 h-96'>
            <Oval
                visible={true}
                height='200'
                width='200'
                color='#3E9FFB'
                ariaLabel='oval-loading'
                strokeWidth='2'
                wrapperStyle={{}}
                wrapperClass='custome-loader'
            />
            <span className='absolute text-text-gray text-xs font-normal'>
                Generating Questions...
            </span>
        </div>
    );
};

export default Loader;
