import { useWindowDimensions } from '@/utils/windowSize';
import React, { useContext } from 'react';
import { BsCheck } from 'react-icons/bs';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';
import Backdrop from '../UI/Backdrop';
import { AppContext } from '@/context/StateContext';

const SuccessModal = ({ onClose }) => {
  const { height, width } = useWindowDimensions();
  const ctx = useContext(AppContext);
  const router = useRouter();

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className="w-[550px] min-h-[300px] font-Poppins text-[#EDEDEF] font-semibold text-2xl bg-[black] p-10 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900">
        <p className="text-center mb-7">Successfull!</p>

        <div className="flex justify-center items-center min-h-[200px] flex-col">
          <BsCheck
            size={90}
            className="p-2 rounded-full bg-[#7CFEA2] text-green-700"
          />

          <p className="text-sm font-normal mt-5 text-green-100">
            Wohooooooo! You've successfully deployed contract 🎉
          </p>

          <button
            onClick={() => {
              router.push(`/explorer/${ctx.user?.addr}`);
            }}
            className="text-sm bg-[#7CFEA2] font-medium py-3 px-6 rounded-xl mt-4 text-green-700 hover:bg-[#66d888]"
          >
            View on Explorer
          </button>
        </div>
      </div>

      <Confetti height={height} width={width} />
    </div>
  );
};

export default SuccessModal;
