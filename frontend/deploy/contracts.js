import * as sdk from "@onflow/sdk";

export default getContracts = async () => {
  const response = await sdk.send(
    await sdk.build([sdk.getAccount(user?.addr)])
  );

  console.log("contracts are", contracts);

  return response?.contracts;
};
