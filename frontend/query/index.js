import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const Query = async (transactionScript, args) => {
  try {
    const txArgs = args.map(arg => {
      return fcl.arg(arg.value, t[arg.type]);
    });

    const txId = await fcl.query({
      cadence: transactionScript,
      args: (arg, t) => txArgs,
    });

    return txId;
  } catch (err) {
    console.log(err);
  }
};

export const Mutate = async (transactionScript, args) => {
  try {
    const txArgs = args.map(arg => {
      return arg(arg.value, t[arg.type]);
    });

    const txId = await fcl.mutate({
      cadence: transactionScript,
      args: (arg, t) => txArgs,
      payer: fcl.currentUser().authorization,
      proposer: fcl.currentUser().authorization,
      authorizations: [fcl.currentUser().authorization],
      limit: 999,
    });

    console.log('Transaction id is', txId);
  } catch (err) {
    console.log(err);
  }
};
