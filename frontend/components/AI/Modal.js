import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { useContext } from 'react';
import { AppContext } from '@/context/StateContext';
import {
  getReadTransactionScript,
  getTransactionScriptForDeployment,
  cadencePrinter,
  getABIFromCode,
} from '../../utils/OpenAIHelpers';

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-0 left-0 fixed bg-black/20 backdrop-blur-md h-screen w-screen"
    ></div>
  );
};

export const Modal = ({ onClose }) => {
  const ctx = useContext(AppContext);
  const code = ctx.aiCode;
  const setCode = ctx.setAiCode;

  const [funInfo, setFunInfo] = useState();
  const [txCode, setTxCode] = useState();
  const [started, setStarted] = useState(false);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI,
  });
  const openai = new OpenAIApi(configuration);

  const getResponse = async () => {
    try {
      setStarted(true);
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cadence code assistant.',
          },
          {
            role: 'user',
            content: 'Write a function in Cadence to increment a number by 1.',
          },
          {
            role: 'assistant',
            content:
              "Sure, here's an example code: pub fun incrementByOne(num: Int): Int { return num + 1}",
          },
          {
            role: 'user',
            content: 'Write a function in Cadence to ' + funInfo,
          },
        ],
      });
      console.log(response.data.choices[0].message);
      const code = cadencePrinter(response.data.choices[0].message.content);
      setCode(code);
      setStarted(false);
    } catch (e) {
      console.log(e);
      setStarted(false);
    }
  };
  const getTxResponse1 = async () => {
    try {
      setStarted(true);

      const args = [{ name: 'greet', type: 'String' }];
      const response = await getTransactionScriptForDeployment(args);
      //   const code2 = `pub contract CustomGreeting {

      //     pub var greeting: String

      //     init() {
      //         self.greeting = "Hello, World!"
      //     }

      //     pub fun updateGreeting(newGreeting: String) {
      //         self.greeting = newGreeting
      //     }

      //     pub fun getGreeting(msg: String): String {
      //         return self.greeting.concat(msg)
      //     }
      // } `;
      // const response = await getABIFromCode(code2);
      console.log(response);
      // const code = cadencePrinter(response);
      setTxCode(response);
      setStarted(false);
    } catch (e) {
      console.log(e);
      setStarted(false);
    }
  };

  const getTxResponse = async () => {
    try {
      setStarted(true);
      const contractName = 'CustomGreeting';
      const contractAddress = '0x373e1d329a2b09dd';
      const inputs = [
        { name: 'msg', type: 'String' },
        { name: 'number', type: 'int' },
        { name: 'msg', type: 'String' },
      ];
      const outputs = [{ name: 'msg', type: 'String' }];
      const response = await getReadTransactionScript(
        contractName,
        contractAddress,
        'getGreeting',
        inputs,
        outputs
      );
      //   const code2 = `pub contract CustomGreeting {

      //     pub var greeting: String

      //     init() {
      //         self.greeting = "Hello, World!"
      //     }

      //     pub fun updateGreeting(newGreeting: String) {
      //         self.greeting = newGreeting
      //     }

      //     pub fun getGreeting(msg: String): String {
      //         return self.greeting.concat(msg)
      //     }
      // } `;
      // const response = await getABIFromCode(code2);
      console.log(response);
      // const code = cadencePrinter(response);
      setTxCode(response);
      setStarted(false);
    } catch (e) {
      console.log(e);
      setStarted(false);
    }
  };

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className="w-[1200px] rounded-2xl absolute top-[10%] left-[20%] shadow-md  rounded-b-2xl  overflow-hidden border border-gray-800">
        <div className="bg-[#232323] pt-6 pb-10 px-4 w-full  rounded-t-2xl">
          <textarea
            onChange={event => {
              setFunInfo(event.target.value);
            }}
            value={funInfo}
            rows={7}
            maxLength={1000}
            className="bg-[#2D2D2D] py-2 border w-full px-2 border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none max-h-[100px]"
            placeholder="A short description of functionality you want to implement along with any other details you think are important."
          />
          {code && (
            <div className="bg-[#2D2D2D] py-2 border w-full px-2 border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none ">
              <pre className="text-gray-300">{code}</pre>
            </div>
          )}
          <div className="flex  gap-4">
            {started ? (
              <button className="bg-blue-700 p-2 px-5 rounded-md mt-2 w-40 flex items-center justify-center">
                <img src="/loading.gif" className="h-7 p-1"></img>
              </button>
            ) : (
              <button
                className="bg-blue-700 p-2 px-5 rounded-md mt-2"
                onClick={getResponse}
                disabled={!funInfo}
              >
                {code ? 'Regenerate' : 'Generate'}
              </button>
            )}
            {code && (
              // @TODO : clicking on this will add the ai code to the main code in deployment section
              <button className="bg-green-700 p-2 px-5 rounded-md mt-2">
                use this code
              </button>
            )}
          </div>

          {txCode && (
            <div className="bg-[#2D2D2D] py-2 border w-full px-2 border-gray-700 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none ">
              <pre className="text-gray-300">{txCode}</pre>
            </div>
          )}
          <div className="flex  gap-4">
            {started ? (
              <button className="bg-blue-700 p-2 px-5 rounded-md mt-2 w-40 flex items-center justify-center">
                <img src="/loading.gif" className="h-7 p-1"></img>
              </button>
            ) : (
              <button
                className="bg-blue-700 p-2 px-5 rounded-md mt-2"
                onClick={getTxResponse1}
              >
                {txCode ? 'Regenerate tx script' : 'Generate tx script'}
              </button>
            )}
            {code && (
              // @TODO : clicking on this will add the ai code to the main code in deployment section
              <button className="bg-green-700 p-2 px-5 rounded-md mt-2">
                use this code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
