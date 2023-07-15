import React, { useEffect, useState } from 'react';
import { BsArrowDownShort, BsArrowRightShort } from 'react-icons/bs';
import ReadItem from './ReadItem';
import WriteItem from './WriteItem';
import { getABIFromCode } from '@/utils/OpenAIHelpers';

const DUMMY_ABI = [
  {
    name: 'init',
    inputs: [],
    outputs: [],
    type: 'write',
  },
  {
    name: 'updateGreeting',
    inputs: [
      {
        name: 'newGreeting',
        type: 'String',
      },
    ],
    outputs: [],
    type: 'write',
  },
  {
    name: 'getGreeting',
    inputs: [],
    outputs: [
      {
        name: 'returnValue',
        type: 'String',
      },
    ],
    type: 'read',
  },

  {
    name: 'getGreeting',
    inputs: [],
    outputs: [
      {
        name: 'returnValue',
        type: 'String',
      },
    ],
    type: 'read',
  },
];

const QueryModal = ({ code, contractName }) => {
  const [showQueryOptions, setShowQueryOptions] = useState(true);
  const [showMutateOptions, setShowMutateOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [abi, setAbi] = useState([]);

  const readMethods = abi.filter(method => method.method === 'query');
  const writeMethods = abi.filter(method => method.method === 'mutate');

  const getAbi = async () => {
    try {
      setLoading(true);
      const abiAI = await getABIFromCode(code);
      const abiJson = JSON.parse(abiAI);
      console.log(abiJson);
      setAbi(abiJson);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAbi();
  }, []);

  return (
    <div className="w-[750px] min-h-[600px] font-Poppins text-[#EDEDEF] font-semibold text-sm bg-[black] p-4 rounded-xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10   overflow-hidden border border-green-300">
      <div className="flex gap-2">
        <p
          className={`${
            showQueryOptions ? 'bg-[#3a3a3a]' : 'bg-[#1d1d1d]'
          } py-2 px-6 rounded-md`}
          onClick={() => {
            setShowQueryOptions(true);
            setShowMutateOptions(false);
          }}
        >
          Query
        </p>
        <p
          onClick={() => {
            setShowMutateOptions(true);
            setShowQueryOptions(false);
          }}
          className={`${
            showMutateOptions ? 'bg-[#3a3a3a]' : 'bg-[#1d1d1d]'
          } py-2 px-6 rounded-md`}
        >
          Mutate
        </p>
      </div>
      {loading && (
        <div className="flex justify-center mt-[30%]">
          <img src="/loading.gif" className="h-7"></img>
        </div>
      )}

      {/* Read */}
      {showQueryOptions ? (
        <div>
          {readMethods.map(method => (
            <ReadItem
              functionName={method.name}
              value={method.outputs[0].name}
              datatype={method.outputs[0].type}
              inputs={method.inputs}
              outputs={method.outputs}
              abi={readMethods}
              contractName={contractName}
              isFunction={method.type === 'function'}
            />
          ))}
        </div>
      ) : null}

      {/* Write */}
      {showMutateOptions ? (
        <div>
          {writeMethods.map((method, i) => (
            <WriteItem
              functionName={method.name}
              i={i}
              inputs={method.inputs}
              abi={writeMethods}
              contractName={contractName}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default QueryModal;
