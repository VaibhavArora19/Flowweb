import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const Deploy = async (contractName, contractCode) => {
  const txId = await fcl
    .send([
      fcl.transaction`${contractCode}`,
      fcl.proposer(fcl.currentUser().authorization),
      fcl.payer(fcl.currentUser().authorization),
      fcl.authorization([fcl.currentUser().authorization]),
      fcl.limit(1000),
      fcl.args([
        fcl.arg(contractName, t.String),
        fcl.arg(Buffer.from(contractCode, "utf8").toString("hex"), t.String),
      ]),
    ])
    .then(fcl.decode);

  console.log("txId", txId);
};

export default Deploy;
