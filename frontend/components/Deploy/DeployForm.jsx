import { deployContract } from '@/deploy';
import { useState } from 'react';
import SuccessModal from '../Modals/DeployModal';
import Loader from '../UI/Loader';

const DeployForm = () => {
  const [contractName, setContractName] = useState('');
  const [contract, setContract] = useState('');
  const [initializable, setInitializable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const deployHandler = async e => {
    setLoading(true);
    try {
      e.preventDefault();
      await deployContract(contractName, contract);
      setLoading(false);
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const initializableHandler = () => {
    setInitializable(!initializable);
  };

  return (
    <>
      <div className="text-white w-[800px] bg-[#131313] flex font-Poppins mx-auto my-20 flex-col p-7 pt-10 rounded-xl border border-gray-900">
        <h2 className="text-xl font-semibold text-white mb-9">
          Deploy Smart Contract
        </h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-Poppins mb-1 text-sm text-gray-400 font-semibold">
              Contract Name
            </label>
            <input
              type="text"
              value={contractName}
              onChange={e => {
                setContractName(e.target.value);
              }}
              className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-Poppins mb-1 text-sm text-gray-400 font-semibold">
              Contract Code
            </label>
            <textarea
              onChange={e => {
                setContract(e.target.value);
              }}
              value={contract}
              rows={20}
              placeholder="Paste your contract here!"
              className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none min-h-[300px] max-h-[300px]"
            />
          </div>

          {/* <p className="text-sm mt-6 mb-2 text-gray-300">
            Select the below button if you want to initialize your contract
          </p>
          <button
            disabled={!contract.length ? true : false}
            onClick={initializableHandler}
            type="button"
            className={`py-3 w-[150px] text-center rounded-md mb-1 ${
              !contract.length && 'cursor-not-allowed'
            } ${
              initializable ? 'bg-[#1a3831] text-green-300' : 'bg-[#363636]'
            } `}
          >
            Initialize
          </button>
          {initializable && (
            <div className="flex flex-col ">
              <p className="text-sm mt-6 mb-2 text-gray-300">Arguement types</p>
              <input
                id="argTypes"
                className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none"
              ></input>
              <p className="text-sm mt-3 mb-2 text-gray-300">
                Arguement values
              </p>
              <input
                id="argValues"
                className="bg-[#2D2D2D] py-2 px-2 border border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none"
              ></input>
            </div>
          )} */}

          <button
            disabled={!contract.length ? true : false}
            onClick={deployHandler}
            type="submit"
            className={`py-3 bg-[#7CFEA2] border-green-700 border text-green-800 font-semibold rounded-xl mt-4 hover:bg-[#8af8ab] ${
              !contract.length && 'cursor-not-allowed'
            }`}
          >
            {loading ? <Loader inComp={true} /> : 'Deploy'}
          </button>
        </form>

        {successModal && (
          <SuccessModal onClose={() => setSuccessModal(false)} />
        )}
      </div>
    </>
  );
};

export default DeployForm;
