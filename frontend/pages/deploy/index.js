import { deployContract } from "@/deploy";
import { useState } from "react";

const Deploy = () => {
  const [contractName, setContractName] = useState("");
  const [contract, setContract] = useState("");

  const deployHandler = async (e) => {
    e.preventDefault();
    await deployContract(contractName, contract);
  };

  return (
    <div className="flex justify-center mt-10">
      <form>
        <div>
          <label className="block">
            <span>Name</span>
          </label>
          <input
            type="name"
            className="h-[40px] rounded-lg w-[400px] text-black"
            onChange={(e) => {
              setContractName(e.target.value);
            }}
            value={contractName}
          />
        </div>
        <div>
          <label className="block mt-4">
            <span>Contract</span>
          </label>
          <textarea
            rows="10"
            cols="50"
            type="text"
            className="h-[400px] rounded-lg w-[400px] text-black"
            onChange={(e) => {
              setContract(e.target.value);
            }}
            value={contract}
          />
        </div>
        <button
          onClick={deployHandler}
          className="mt-6 bg-blue-800 w-[300px] ml-10 rounded-lg h-[40px]"
        >
          Deploy
        </button>
      </form>
    </div>
  );
};

export default Deploy;
