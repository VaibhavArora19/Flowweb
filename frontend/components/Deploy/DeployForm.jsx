import { deployContract } from '@/deploy';
import { useState } from 'react';
import SuccessModal from '../Modals/DeployModal';
import Loader from '../UI/Loader';
import { ArgsModal } from './ArgsModal';
const DeployForm = () => {
  const [contractName, setContractName] = useState('');
  const [contract, setContract] = useState('');
  const [haveArgs, setContractArgs] = useState(false);
  const [argValues, setArgValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const deployHandler = async e => {
    setLoading(true);
    try {
      e.preventDefault();
      if (contract.includes('init')) {
        setContractArgs(true);
        setLoading(false);
      } else {
        await deployContract(contractName, contract, []);
        setLoading(false);
        setSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setContractArgs(false);
    }
  };

  const continueDeploy = async () => {
    try {
      await deployContract(contractName, contract, argValues);
      setLoading(false);
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setContractArgs(false);
    }
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
              placeholder="Enter contract name"
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
        {haveArgs && (
          <ArgsModal
            onClose={() => setContractArgs(false)}
            code={contract}
            setArgValues={setArgValues}
            argValues={argValues}
            continueDeploy={continueDeploy}
          />
        )}

        {successModal && (
          <SuccessModal onClose={() => setSuccessModal(false)} />
        )}
      </div>
    </>
  );
};

export default DeployForm;
