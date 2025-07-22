import { AlgorandClient } from '@algorandfoundation/algokit-utils';

export async function mintAsset(
  creatorAddress: string,
  signer: any, // The signTransactions function from useWallet
  algodClient: any // The algodClient from useWallet
) {
  // Create an AlgorandClient instance from the existing algod client
  const algorand = AlgorandClient.fromClients({ algod: algodClient });

  // Mint the asset, passing the signer
  const result = await algorand.send.assetCreate({
    sender: creatorAddress,
    total: 1n,
    decimals: 0,
    assetName: 'MasterPassToken',
    unitName: 'MTK',
    signer, // Pass the wallet's signer here
  });

  return result.assetId;
}