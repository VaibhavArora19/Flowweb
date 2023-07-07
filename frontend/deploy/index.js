import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export const deployContract = async (contractName, contractCode) => {
  console.log("currentUser", fcl.currentUser());
  const txId = await fcl
    .send([
      fcl.transaction`
            transaction(name: String, code: String) {
                prepare(acct: AuthAccount) {
                    acct.contracts.add(name: name, code: code.decodeHex())
                }
            }
        `,
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization), // optional - default is fcl.authz
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.limit(1000),
      fcl.args([
        fcl.arg(contractName, t.String),
        fcl.arg(Buffer.from(contractCode, "utf8").toString("hex"), t.String),
      ]),
    ])
    .then(fcl.decode);

  console.log("txId", txId);
};

export const updateContract = async (contractName, contractCode) => {
  const txId = await fcl.mutate({
    cadence: `
    transaction(name: String, cadence: String) {
      prepare(signer: AuthAccount) {
        let code = cadence.utf8
        signer.contracts.update__experimental(name: name, code: code)
      }
    }
  `,
    args: (arg, t) => {
      arg(contractName, t.String), arg(contractCode, t.String);
    },
    payer: fcl.currentUser().authorization,
    proposer: fcl.currentUser().authorization,
    authorization: [fcl.currentUser().authorization],
    limit: 1000,
  });

  console.log("tx id is", txId);
};
