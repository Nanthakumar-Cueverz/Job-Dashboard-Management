import React, { useState } from 'react';
import SigninImage from '@images/smiling-young.png';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const handleForgotPassword = () => {
        alert('Redirect to Forgot Password page!');
    };
    return (
        <section class='bg-white'>
            <div className='lg:w-full xl:max-w-7xl m-auto'>
                <div class='grid grid-cols-1 lg:grid-cols-2'>
                    <div class='flex items-center justify-center px-4 bg-white'>
                        <div class=''>
                            <h2 class='text-3xl font-semibold leading-tight text-black sm:text-4xl'>
                                Welcome to <span className='text-primary'>INTERVIEW AI</span>
                            </h2>
                            <p class='mt-2 text-base text-gray-600'>Please enter your details.</p>
                            <div className='py-10'>
                                <form className='space-y-5'>
                                    <Input
                                        label='Email'
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your email'
                                        required
                                    />
                                    <PasswordInput
                                        label='Password'
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter your Password'
                                        required
                                    />
                                    <div className='flex items-center justify-between w-full mt-3'>
                                        {/* Remember Me Checkbox */}
                                        <label className='flex items-center text-sm text-gray-600 cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                checked={remember}
                                                onChange={() => setRemember(!remember)}
                                                className='mr-2 h-4 w-4 accent-primary cursor-pointer'
                                            />
                                            Remember Me
                                        </label>

                                        {/* Forgot Password Link */}
                                        <button
                                            type='button'
                                            onClick={handleForgotPassword}
                                            className='link-button'
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div className='pt-10'>
                                        <a href='/' className='btn-fill w-full'>
                                            Sign in
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='my-auto flex py-5'>
                        <img
                            class='object-cover  w-full h-[94vh] ml-auto flex rounded-l-3xl '
                            src={SigninImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
