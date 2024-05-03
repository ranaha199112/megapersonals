import React from 'react';
import useRedirect from '../hooks/useRedirect';

const RedirectPage = () => {
    const { secondsRemaining } = useRedirect('/', 5);
    return (
        <div className="absolute inset-0 bg-white h-screen">
      <div className="flex flex-col justify-center items-center h-full">
     <div class="md:w-[450px] rounded-md bg-white shadow-md overflow-hidden ">
        <div class="py-3.5 px-5 bg-gray-200 flex justify-between items-center">
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                </button>
                <p class="text-center capitalize text-sm font-bold text-gray-500">NEED HELP?</p>
                <button type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                </div>
                <div class="h-[350px] flex flex-col items-center bg-blue-500 pt-8 gap-5">
                    <p class="text-[22px] font-xs  text-white pt-3">Please wait while we review your photo...</p>
                    <p class="text-[22px] font-xs  text-white pt-3">  {secondsRemaining} {secondsRemaining > 1 ? 'seconds' : 'second'}.</p>
                    <p class="text-[18px] font-xs  text-white pt-3">Contact Us:help@bluecheck.me</p>
                        
                        </div>
                        </div>
                        </div>
                        </div>
    );
};

export default RedirectPage;