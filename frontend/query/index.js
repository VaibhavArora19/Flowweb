import * as fcl from '@onflow/fcl';

export const Query = async (transactionScript, args) => {
  try {
    const txArgs = args.map(arg => {
      return arg(arg.value, arg.type);
    });

    const txId = await fcl.query({
      cadence: transactionScript,
      args: (arg, t) => txArgs,
    });

    console.log('Transaction id is', txId);
  } catch (err) {
    console.log(err);
  }
};

export const Mutate = async (transactionScript, args) => {
  try {
    const txArgs = args.map(arg => {
      return arg(arg.value, arg.type);
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
