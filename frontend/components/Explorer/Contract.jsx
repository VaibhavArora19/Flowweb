import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Highlight from 'react-highlight';
import styles from '../../node_modules/highlight.js/styles/railscasts.css';
import Backdrop from '../UI/Backdrop';
import { updateContract } from '@/deploy';
import Loader from '../UI/Loader';

// const Code = ({code}) => {
//   return (
//     <div className='mt-5 rounded-md overflow-hidden' >
//     <Highlight className={`${styles}`} innerHTML={false} >
//      {code}
//     </Highlight>
//   </div>
//   )
// }

// export default Code

const Contract = ({ contract }) => {
  const [showModal, setShowModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [editedContract, setEditedContract] = useState(contract.contract);
  const [isLoading, setIsLoading] = useState(false);


  const updateContractHandler = async () => {
    try {
      setIsLoading(true);
      await updateContract(contract?.name, editedContract)
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
    }
  }


  return (
    <div className="bg-[#151717] relative p-6 rounded-xl w-[350px] hover:bg-[#1c1e1e] cursor-pointer  ">
      <img
        src="/img.png"
        alt="Image"
        height={70}
        width={70}
        className="rounded-md mb-4"
      />
      <BsThreeDotsVertical
        onClick={() => {
          setShowModal(!showModal);
        }}
        size={20}
        className="absolute right-2 top-5 text-gray-500 hover:text-white cursor-pointer"
      />
      <p className="font-semibold font-Poppins text-xl mb-2">
        {contract?.name}
      </p>
      <p className="text-sm font-Poppins font-light">
        Deployed on : <span className="text-[#7CFEA2]">12/10/23</span>
      </p>

      {showModal && (
        <div className="absolute right-3 top-8 text-[0.85rem] leading-[1.2rem] bg-[#111111] py-2 px-2 rounded-md flex flex-col gap-2 ">
          <p
            onClick={() => {
              setShowContractModal(true);
              setShowModal(false);
            }}
          >
            View
          </p>
          <p
            onClick={() => {
              setShowEditModal(true);
              setShowModal(false);
            }}
          >
            Edit{' '}
          </p>
          <p>Query </p>
        </div>
      )}

      {showContractModal ? (
        <>
          <Backdrop
            onClose={() => {
              setShowContractModal(false);
            }}
          />
          <div className="w-[550px] min-h-[300px] font-Poppins text-[#EDEDEF] font-semibold text-sm bg-[black] p-4 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900">
            <Highlight className={`${styles}`} innerHTML={false}>
              {contract?.contract}
            </Highlight>
          </div>
        </>
      ) : null}

      {showEditModal ? (
        <>
          <Backdrop
            onClose={() => {
              setShowEditModal(false);
            }}
          />
          <div className="w-fit min-h-[300px] flex flex-col font-Poppins text-[#EDEDEF] font-semibold text-sm bg-[black] p-4 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900">
            <textarea
              onChange={e => {
                setEditedContract(e.target.value);
              }}
              rows={20}
              value={editedContract}
              className="w-[600px] bg-[#1e1e1e] outline-none border-none"
            />

            <button
              onClick={updateContractHandler}
              className="py-3 w-full mt-5 rounded-md bg-[#7CFEA2] text-black"
            >
              {isLoading ? <Loader inComp={true}/> : "Redeploy"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Contract;
