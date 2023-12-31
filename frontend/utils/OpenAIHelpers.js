import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI,
});
const openai = new OpenAIApi(configuration);
export const getABIFromCode = async code => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful cadence assistant.',
        },
        {
          role: 'user',
          content:
            'convert this candence code to ABI: pub contract HelloWorld {\n    pub let greeting: String\n\n    init(greet: String) {\n        self.greeting = greet\n    }\n\n    pub fun getGreeting(): String {\n        return self.greeting\n    }\n}',
        },
        {
          role: 'assistant',
          content: `Sure, here's an ABI for aboce code: [{"name": "greeting", "inputs": [], "outputs": [{"name": "", "type": "String"}], "method": "query", type:"variable"}, {"name": "getGreeting", "inputs": [], "outputs": [{"name": "", "type": "String"}], "method": "mutate",type:"function"}]`,
        },
        {
          role: 'user',
          content:
            'convert this candence code to ABI: ' +
            code +
            "and olny print the output of abi don't add any other texts ",
        },
      ],
    });
    console.log(response.data.choices[0].message);
    return response.data.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

export const getWriteTransactionScript = async (
  contractName,
  address,
  functionName,
  inputs
) => {
  if (inputs.length > 0) {
    const inputString = inputs.map(input => {
      return input.name + ': ' + input.type;
    });
    const inputValue = inputs.map(input => {
      return input.name + ': ' + input.name;
    });
    return `import ${contractName} from ${address}\n\ntransaction(${inputString}) {\n prepare(acct: AuthAccount) {\n    ${contractName}.${functionName}(
      ${inputValue})\n}}`;
  } else {
    return `import ${contractName} from ${address}\n\ntransaction(){\n    prepare(acct: AuthAccount) {\n   
          ${contractName}.${functionName}();
      }}`;
  }
};

export const getReadTransactionScript = async (
  contractName,
  address,
  functionName,
  inputs,
  outputs,
  isFunction
) => {
  if (inputs.length > 0) {
    const inputString = inputs.map(input => {
      return input.name + ': ' + input.type;
    });
    const inputValue = inputs.map(input => {
      return input.name + ': ' + input.name;
    });
    return `import ${contractName} from ${address}\n\npub fun main(${inputString}):${outputs[0].type} {\n return ${contractName}.${functionName}(
      ${inputValue})\n}`;
  } else {
    return `import ${contractName} from ${address}\n\npub fun main():${
      outputs[0].type
    } {\n return ${contractName}.${functionName}${isFunction ? '()' : ''}\n}`;
  }
};

export const getTransactionScript = async (
  contractName,
  address,
  functionName,
  args
) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful cadence transaction script assistant.',
        },
        {
          role: 'user',
          content:
            'Write a example script in javascript to interact with contract with args and using Flow JavaScript SDK (@onflow/fcl).',
        },
        {
          role: 'assistant',
          content:
            "Sure, here's an example code: await fcl.mutate({cadence: `import HelloWorld from 0xDeployer; transaction(newGreeting: String) { prepare(signer: AuthAccount) { } execute { HelloWorld.changeGreeting(newGreeting: newGreeting) } }`, args: (arg, t) => [arg(newGreeting, t.String)], proposer: fcl.authz, payer: fcl.authz, authorizations: [fcl.authz], limit: 999}); console.log(`Transaction Id:`, transactionId);",
        },
        {
          role: 'user',
          content:
            'Write a example script in javascript to interact with contract with name  ' +
            contractName +
            'from address ' +
            address +
            ' with function name ' +
            functionName +
            ' with these arguments and using Flow JavaScript SDK (@onflow/fcl).' +
            args,
        },
      ],
    });
    console.log(response.data.choices[0].message);
    return response.data.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

export const getAIFunctionCode = async (funInfo, codeInput) => {
  try {
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
          content:
            'Write a function in Cadence to ' +
            funInfo +
            'to insert in this cadence contract' +
            codeInput,
        },
      ],
    });
    console.log(response.data.choices[0].message);
    const code = cadencePrinter(response.data.choices[0].message.content);
    return code;
  } catch (e) {
    console.log(e);
  }
};

export const getTransactionScriptForDeployment = async args => {
  if (args.length > 0) {
    const argString = args.map(arg => {
      return arg.name + ': ' + arg.type;
    });
    const argValue = args.map(arg => {
      return arg.name + ' ';
    });

    return `transaction(name: String, code: String, ${argString}) {\n    prepare(signer: AuthAccount) {\n        signer.contracts.add(name: name, code: code.decodeHex(), ${argValue})\n    }\n}`;
  } else {
    return `transaction(name: String, code: String) {\n    prepare(signer: AuthAccount) {\n        signer.contracts.add(name: name, code: code.decodeHex())\n    }\n}`;
  }
};

export const getConstructorARGS = async code => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful cadence language assistant.',
        },
        {
          role: 'user',
          content:
            ' code: pub contract HelloWorld {\n    pub let greeting: String\n\n    init(greet: String) {\n        self.greeting = greet\n    }\n\n    pub fun getGreeting(): String {\n        return self.greeting\n    }\n} ',
        },
        {
          role: 'assistant',
          content:
            "Sure, here's an example code: transaction(name: String, code: String) { prepare(signer: AuthAccount) { var arg1 = `test` ; signer.contracts.add(name: name, code: code.decodeHex(), arg1) }}",
        },
        {
          role: 'user',
          content:
            'Write a transaction script in Cadence for deploying this contract code' +
            code +
            ' with name ' +
            contractName +
            ' these arguments of array ' +
            args,
        },
      ],
    });
    console.log(response.data.choices[0].message);
  } catch (e) {
    console.log(e);
  }
};

export function cadencePrinter(codeString) {
  let matches;
  const regex1 = /```cadence([\s\S]*?)```/g;
  const regex2 = /```([\s\S]*?)```/g;
  const str = codeString;
  matches = str.match(regex1);
  if (!matches) {
    matches = str.match(regex2);
  }
  let match = matches[0];
  match = match.replace('```cadence', '').trim();
  match = match.replaceAll('```', '').trim();
  return match;
}
