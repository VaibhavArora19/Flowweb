import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.min.css'; //Example style, you can use another

const Create = () => {
  const [code, setCode] = React.useState(
    `pub contract Counter {
      pub var counter: Int
  
      init() {
          self.counter = 0
      }
  
      pub fun incrementCounter(amount: Int) {
          self.counter = self.counter + amount
      }
  }
  `
  );

  return (
    <div className="flex w-[90%] mx-auto bg-[#121212] min-h-[80vh] mt-10 rounded-lg gap-2 font-Poppins">
      <div className="flex-[0.35] bg-[#1d1d1d] rounded-l-lg px-6 py-7">
        <p className="text-2xl font-semibold">Create & Deploy Contracts</p>

        <div className="flex flex-col mb-1 mt-6">
          <label className="text-sm text-gray-500 ">Contract Name</label>
          <input className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md " />
        </div>

        {/* AI */}
        <div className="flex flex-col mb-1 mt-6">
          <label className="text-sm text-gray-500 ">
            Add function logic (using GPT+4)
          </label>
          <textarea
            placeholder="Add a small prompt for function logic"
            rows={5}
            className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md placeholder:text-xs placeholder:text-gray-600 "
          />

          <button className="bg-[#212e24] py-2 w-full mt-2 rounded-md text-sm text-green-400">
            Add to Code
          </button>
        </div>

        {/* Constructor */}
        <div className="flex flex-col mb-1 mt-6">
          <label className="text-sm text-gray-500 ">
            Constructor arguments (if any)
          </label>

          <div className="flex gap-10 mt-1 mb-2">
            <input
              placeholder="name"
              className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md placeholder:text-xs placeholder:text-gray-600 "
            />
            <input
              placeholder="type"
              className="bg-[#121212] py-2 outline-none  px-2 mt-1 rounded-md placeholder:text-xs placeholder:text-gray-600"
            />
          </div>

          <button className="bg-[#212e24] py-2 w-full mt-2 rounded-md text-sm text-green-400">
            Add to Code
          </button>
        </div>


        {/* Deploy Button */}
        <button
          className="py-3 w-full bg-[#7CFEA2] border-green-700 border text-green-800 font-semibold rounded-md  mt-12 hover:bg-[#8af8ab] 
              "
        >
          Deploy
        </button>
      </div>
      <div className="flex-[0.65]">
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
    </div>
  );
};

export default Create;
