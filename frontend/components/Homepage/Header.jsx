import { useRouter } from 'next/router';
import React from 'react';
import { HiMiniArrowSmallRight } from 'react-icons/hi2';

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex h-[93vh] flex-col items-center pt-40">
      <p className="text-gray-400 font-Poppins text-xl font-light uppercase">
        Welcome to Flowweb
      </p>
      <p className="text-center text-[100px] font-bold font-Poppins leading-[110px]">
        Create your contracts <br /> on{' '}
        <span className="text-[#7CFEA2]">FLOW</span>
      </p>

      <button
        onClick={() => {
          router.push('/create');
        }}
        className="bg-[#7CFEA2] py-5 w-[300px] text-black text-xl font-semibold font-Poppins flex items-center gap-1  justify-center rounded-full mt-14 hover:bg-white hover:text-[#41a960] "
      >
        <p className="text-center">Get Started </p>
        <HiMiniArrowSmallRight size={35} />
      </button>
    </div>
  );
};

export default Header;
