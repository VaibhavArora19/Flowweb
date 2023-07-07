import * as sdk from "@onflow/sdk";

export const getContracts = async (user) => {
  const response = await sdk.send(
    await sdk.build([sdk.getAccount(user?.addr)])
  );

  return response?.account?.contracts;
};
