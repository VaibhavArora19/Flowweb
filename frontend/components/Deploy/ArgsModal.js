import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Loader from '../UI/Loader';

import { getABIFromCode } from '@/utils/OpenAIHelpers';
const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-0 left-0 fixed bg-black/20 backdrop-blur-md h-screen w-screen"
    ></div>
  );
};

export const ArgsModal = ({
  onClose,
  code,
  setArgValues,
  argValues,
  continueDeploy,
}) => {
  const [loading, setLoading] = useState(false);
  const getArgs = async () => {
    try {
      setLoading(true);
      const abiString = await getABIFromCode(code);
      const abi = JSON.parse(abiString);
      const initFunction = abi.find(func => func.name === 'init');
      console.log(initFunction);
      const initInputs = initFunction.inputs;
      setArgValues(initInputs);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      getArgs();
    }
  }, []);

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className="w-[50%] rounded-2xl absolute top-[30%] left-[25%] shadow-md  rounded-b-2xl  overflow-hidden border border-gray-800">
        <div className="bg-[#232323] pt-6 pb-10 px-4 w-full  rounded-t-2xl">
          {loading ? (
            <Loader inComp={true} />
          ) : (
            <div>
              {argValues &&
                argValues.map(arg => {
                  return (
                    <div className="flex flex-col mb-2">
                      <p className="text-sm text-gray-400 mb-4 font-semibold">
                        Add arguments here
                      </p>
                      <label className="text-white text-lg font-Poppins">
                        {arg.name}
                      </label>
                      <input
                        className="border border-gray-800 rounded-md p-2 bg-[#2D2D2D] text-white outline-none"
                        type={arg.type}
                        onChange={e => {
                          setArgValues(
                            argValues.map(argValue => {
                              if (argValue.name === arg.name) {
                                return {
                                  ...argValue,
                                  value: e.target.value,
                                };
                              }
                              return argValue;
                            })
                          );
                        }}
                      />
                    </div>
                  );
                })}
              <button
                onClick={() => {
                  setLoading(true);
                  continueDeploy();
                }}
                className="bg-[#7CFEA2] text-black rounded-md p-2 font-Poppins mt-2 text-lg"
              >
                {loading ? <Loader inComp={true} /> : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
