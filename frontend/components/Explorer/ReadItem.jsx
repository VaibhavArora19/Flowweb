import React, { useState } from 'react';
import ReadInput from './ReadInput';
import { useRouter } from 'next/router';
import { getReadTransactionScript } from '@/utils/OpenAIHelpers';
import { Query } from '@/query';
const ReadItem = ({
  i,
  value,
  datatype,
  functionName,
  inputs,
  isFunction,
  contractName,
  outputs,
}) => {
  const [showReadData, setShowReadData] = useState(false);
  const [enteredInput, setEnteredInput] = useState(inputs);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const address = router.query.address;
  console.log(enteredInput);

  const queryHandler = async event => {
    event.preventDefault();

    try {
      const script = await getReadTransactionScript(
        contractName,
        address,
        functionName,
        inputs,
        outputs,
        isFunction
      );
      const result = await Query(script, enteredInput);
      console.log(result);
      setResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  const readDataHandler = async () => {
    try {
      const script = await getReadTransactionScript(
        contractName,
        address,
        functionName,
        inputs,
        outputs,
        isFunction
      );
      const result = await Query(script, []);
      console.log(result);
      setResult(result);

      // const result = await executeScript(script);
      // setResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#121212] rounded-md mt-4 select-none overflow-hidden">
      <p
        onClick={() => {
          setShowReadData(!showReadData);
        }}
        className="text-white py-3 px-4 flex items-center gap-2 cursor-pointer font-light"
      >
        {functionName}
      </p>

      {showReadData &&
        (inputs.length === 0 ? (
          <>
            <div className="items-center gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
              <p className="font-medium text-white">{value}</p>
              <p className="text-gray-300 italic text-sm block-inline">
                {datatype}
              </p>
              <div className="block mt-4">
                <p className="text-white">{result !== null && result}</p>
                <button
                  type="submit"
                  className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
                  onClick={readDataHandler}
                >
                  Query
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
            <form onSubmit={queryHandler} className="flex flex-col">
              {inputs?.map((input, i) => (
                <ReadInput
                  name={input.name}
                  type={input.type}
                  key={i}
                  i={i}
                  enteredInput={enteredInput}
                  setEnteredInput={setEnteredInput}
                />
              ))}
              <p className="text-white mt-1 ml-1">
                {result !== null && result}
              </p>
              <button
                type="submit"
                className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
                onClick={queryHandler}
              >
                Query
              </button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default ReadItem;
