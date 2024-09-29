import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';

const wallet = await WalletBuilder.build(
  'https://indexer.testnet.midnight.network/api/v1/graphql',
  'wss://indexer.testnet.midnight.network/api/v1/graphql',
  'http://localhost:6300',
  'https://rpc.testnet.midnight.network',
  NetworkId.TestNet,
  "error"
);

wallet.start();

async function transaction(address) {
  const transactionToProve = await wallet.transferTransaction([
    {
      amount: 1,
      tokenType: '02000000000000000000000000000000000000000000000000000000000000000000', // tDUST token type
      receiverAddress: address
    }
  ]);
  const provenTransaction = await wallet.proveTransaction(transactionToProve);

  await wallet.submitTransaction(provenTransaction);
}

export { transaction, wallet };
