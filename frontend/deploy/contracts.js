import * as sdk from "@onflow/sdk";
import * as fcl from "@onflow/fcl";

export const getContracts = async (user) => {
  if (user) {
    const response = await sdk.send(
      await sdk.build([sdk.getAccount(user?.addr)])
    );

    return response?.account?.contracts;
  }
};

export const makeTransaction = async (flowTransaction) => {
  try {
    const response = await fcl.send([
      fcl.transaction(flowTransaction),
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.limit(10000),
    ]);

    console.log("Transaction executed successfully:", response);
  } catch (err) {
    console.error("Some error occured:", err);
  }
};
