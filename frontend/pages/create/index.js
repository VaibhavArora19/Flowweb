import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { useEffect } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.min.css'; //Example style, you can use another
import { getAIFunctionCode } from '../../utils/OpenAIHelpers';
import { deployContract } from '@/deploy';
import SuccessModal from '../../components/Modals/DeployModal';
import Loader from '@/components/UI/Loader';

const Create = () => {
  const [code, setCode] = React.useState('');
  const [funInfo, setFunInfo] = React.useState();
  const [conArgs, setConArgs] = React.useState([]);
  const [successModal, setSuccessModal] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const contractName = () => {
    const contractNameRegex = /contract\s+(\w+)\s*\{/;
    const matches = contractNameRegex.exec(code);
    const contractName = matches ? matches[1] : '';
    return contractName;
  };

  const deploy = async () => {
    try {
      const name = contractName();
      await deployContract(name, code, conArgs);
    } catch (e) {
      console.log(e);
    }
  };

  const addFunction = async () => {
    try {
      setLoading(true);
      const response = await getAIFunctionCode(funInfo, code);
      console.log(response);
      // const closingBraceIndex = code.lastIndexOf('}');
      // const updatedCadenceCode =
      //   code.slice(0, closingBraceIndex) +
      //   response +
      //   code.slice(closingBraceIndex);
      if (response) setCode(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      const initFunctionRegex = /init\s*\(\s*([^)]*)\s*\)\s*{/;
      const matches = initFunctionRegex.exec(code);
      const params = matches ? matches[1] : '';

      const paramsArray = params
        .split(',')
        .map(param => param.trim())
        .filter(Boolean)
        .map(param => {
          const [name, type] = param.split(':').map(part => part.trim());
          return { name, type };
        });

      console.log('Init Function Params:', paramsArray);
      setConArgs(paramsArray);
    }
  }, [code]);
  console.log(conArgs);

  return (
    <div className="flex w-[90%] mx-auto bg-[#121212] h-[80vh] mt-10 rounded-lg gap-2 font-Poppins">
      <div className="flex-[0.35] max-w-[600px] bg-[#1d1d1d] rounded-l-lg px-6 py-7">
        <p className="text-2xl font-semibold">Create & Deploy Contracts</p>

        {/* AI */}
        <div className="flex flex-col mb-1 mt-6">
          <label className="text-sm text-gray-500 ">
            Add code by entering logic here for a function or init code (using
            GPT-3)
          </label>
          <textarea
            onChange={event => {
              setFunInfo(event.target.value);
            }}
            value={funInfo}
            placeholder="Add a small prompt for function logic"
            rows={5}
            className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md placeholder:text-xs placeholder:text-gray-600 "
          />

          <button
            className="bg-[#212e24] py-2 w-full mt-2 rounded-md text-sm text-green-400"
            onClick={addFunction}
          >
            {loading ? <Loader inComp={true} /> : 'Generate and Add to Code'}
          </button>
        </div>

        {/* Constructor */}
        {conArgs.length > 0 && (
          <div className="flex flex-col mb-1 mt-6">
            <label className="text-sm text-gray-500 ">
              Constructor arguments
            </label>

            <div className="flex gap-2  mt-1 mb-2">
              {conArgs.map(
                (arg, index) =>
                  arg.name &&
                  arg.type && (
                    <div
                      key={index}
                      className="flex-col items-center justify-between w-full"
                    >
                      <p className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md border border-gray-800">
                        {arg.name}
                      </p>
                      <p className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md border border-gray-800">
                        {arg.type}
                      </p>

                      <input
                        placeholder="value"
                        className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md placeholder:text-xs placeholder:text-gray-600 "
                        onChange={event => {
                          const updatedArgs = [...conArgs];
                          updatedArgs[index].value = event.target.value;
                          setConArgs(updatedArgs);
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* Deploy Button */}
        <button
          className="py-3 w-full bg-[#7CFEA2] border-green-700 border text-green-800 font-semibold rounded-md  mt-12 hover:bg-[#8af8ab] 
              "
          onClick={deploy}
        >
          Deploy
        </button>
      </div>
      <div className="flex-[0.65] overflow-y-scroll">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          className="text-lg "
          style={{
            outline: 'none',
            border: 0,
          }}
        />
      </div>
      {successModal && <SuccessModal onClose={() => setSuccessModal(false)} />}
    </div>
  );
};

export default Create;
