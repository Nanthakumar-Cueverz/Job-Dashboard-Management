import React, { useState } from 'react';
import Clock from '@icons/clock.svg?react';
import Googlemeet from '@icons/googlemeet.svg?react';
import Calendar from 'react-calendar';
import CircleDot from '@icons/circle-dot.svg?react';
import 'react-calendar/dist/Calendar.css';
import CheckIcon from '@icons/check.svg?react';
import CloseIcon from '@icons/x.svg?react';
import { toast } from 'react-hot-toast';
const ScheduleCall = ({ selectedCandidate, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = ['08:30 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'];

    const handleTimeSelect = (time) => {
        if (!selectedDate) return;
        setSelectedTime(time);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setSelectedTime('');
    };

    const handleSchedule = () => {
        if (!selectedDate || !selectedTime) return;
        if (selectedCandidate) {
            sessionStorage.setItem(
                `scheduled_${selectedCandidate.email}`,
                JSON.stringify({ status: 'Scheduled', date: selectedDate, time: selectedTime }),
            );
        }
        toast.custom(
            (t) => (
                <div className='bg-green-200 text-primary-green px-5 flex items-center rounded-md whitespace-nowrap text-xs py-3 font-semibold '>
                    <CheckIcon className='bg-primary-green  text-white rounded-full p-0.5 mr-2 h-4 w-4 stroke-3' />
                    Interview has been scheduled successfully
                </div>
            ),
            {
                duration: 5000,
            },
        );
        onClose();
    };

    return (
        <div>
            <div className='flex items-center justify-between pb-2'>
                <h2 className='text-lg font-semibold'>Schedule a Call</h2>
                <button
                    className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 flex items-center justify-center transition duration-200'
                    onClick={onClose}
                >
                    <CloseIcon className='w-4 h-4 text-gray-600' />
                </button>
            </div>

            <div className='w-full border-b border-border-secondary pb-4'>
                <div className='flex space-x-3'>
                    <CircleDot className='bg-black p-1 rounded-md text-white w-14 h-10 lg:h-8 lg:w-8' />
                    <div>
                        <h2 className='text-text-gray font-semibold text-sm'>Teerq</h2>
                        <p className='para'>
                            Teerq would like to schedule an interview with you! Pick a time & date.
                        </p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-4'>
                {/* Date Picker */}
                <div className='col-span-12 lg:col-span-6 pt-5 border-r-0 lg:border-r border-e-border-secondary pr-0 lg:pr-5'>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className='px-5 lg:px-0'
                    />
                </div>
                {/* Time Slot Selection */}
                <div className='col-span-12 lg:col-span-6 pt-0 md:pt-5'>
                    <div className='flex lg:block justify-start space-x-5 lg:justify-between py-2'>
                        <h6 className='fill-white text-neutral font-medium flex align-middle items-center text-xs mb-3'>
                            <Clock className='mr-5 h-6 w-6' />
                            <span>30 min</span>
                        </h6>
                        <h6 className='fill-white text-neutral font-medium flex align-middle items-center text-xs mb-3'>
                            <Googlemeet className='mr-5 h-5 w-5' />
                            <span>Google Meet</span>
                        </h6>
                    </div>

                    {/* Time Slots */}
                    <h1 className='text-md text-subtext-primary font-semibold pb-3'>
                        Choose Time Slot
                    </h1>
                    <div className='grid grid-cols-3 gap-2'>
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                className={`text-xs w-full py-3 rounded-md font-normal transition-all duration-200 ${
                                    selectedTime === time
                                        ? 'bg-primary text-white'
                                        : selectedDate
                                        ? 'bg-secondary text-primary'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                onClick={() => handleTimeSelect(time)}
                                disabled={!selectedDate} // Disable if no date is selected
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    {/* Submit Button */}
                    <div className='pt-5 text-end relative mt-5 lg:mt-0 border-t border-border-primary lg:border-t-0 lg:absolute right-0 lg:bottom-5 lg:right-5'>
                        <button
                            onClick={handleSchedule}
                            className={`btn-fill py-2 ${
                                selectedDate && selectedTime ? '' : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!selectedDate || !selectedTime}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCall;
