import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/auth';
import Footer from '../../../components/componentsAccount/Footer';
import Logo from '../../../components/componentsAccount/Logo';
import { IoAlertOutline } from 'react-icons/io5';

const LoginPassword = () => {
  const navigate = useNavigate();

  const [clientPass, setClientPass] = useState('');
  const [handlePass, sethandlePass] = useState('');
  const emailFromLocalStorage = localStorage.getItem("email")
  
  const passHandler = (e) => {
    setClientPass(e.target.value);
    sethandlePass("");
  };
  
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(emailFromLocalStorage, clientPass);
      if (res.user.emailVerified) {
        localStorage.setItem('tokens', res.user.accessToken);
        localStorage.removeItem("email")
        navigate('/');
      }
      else{
        sethandlePass("you should to verify your email")
      }
    }
    catch (err) {
      sethandlePass("not valid")
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <Logo />
      <form
        className='w-[348px] mb-5 mx-auto  flex flex-col items-center'
        onSubmit={(e) => {
          loginHandler(e);
        }}
      >
        <div className='border border-zinc-200 p-6 w-full rounded-lg'>
          <h2 className='font-[500] text-3xl mb-2'>Sign in</h2>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <div className='mt-3 text-[13px] font-[400] '>
                <p>
                  {emailFromLocalStorage}{' '}
                  <Link
                    to={'/login'}
                    className='text-[#0066c0] hover:underline hover:text-[#c45500] cursor-pointer'
                  >
                    Change
                  </Link>
                </p>
              </div>
              <div className='w-full flex mt-3 font-[600] text-sm justify-between'>
                <p>Password</p>
              </div>
              <input
                type="password"
                onChange={ passHandler }
                placeholder='password'
                className='w-full py-1 p-2 border border-zinc-400 outline-none rounded-sm
                        focus-within:shadow-amazoneInput duration-100
                        focus-within:border-amazoneInput'
              />
              {handlePass && (
                <div className='flex items-center mt-1 space-x-0.5 text-[#c40000] '>
                  <span className='text-[15px]'>
                    <IoAlertOutline />
                  </span>
                  <span className='text-[13px]'>{handlePass}</span>
                </div>
              )}
            </div>
            <div
              className='rounded-lg mt-2 text-sm flex  items-center h-8
              bg-[#FFD814] border border-[#FCD200] 
              hover:bg-[#F7CA00] hover:border-[#F2C200] hover:cursor-pointer
              active:bg-[#F0B800] active:border-[#008296] active:shadow-continueButton'
            >
              <input
                type='submit'
                className='w-full z-10 hover:cursor-pointer'
                value={'Sign in'}
              />
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default LoginPassword;
