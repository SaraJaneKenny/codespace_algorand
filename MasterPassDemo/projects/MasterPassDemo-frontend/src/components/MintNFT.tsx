// src/components/MintNFT.ts
import algosdk from 'algosdk'

const NFT_METADATA_URL = 'ipfs://bafkreihhs22ko4zgbl4zt3jjscjhyj4x4h2swemdq5cakwfsqisaz4iwwe#arc3'

export async function mintNft(
  activeAddress: string,
  signTransactions: (txns: algosdk.Transaction[]) => Promise<(string | Uint8Array)[]>,
  algodClient: algosdk.Algodv2
): Promise<number | undefined> {
  if (!activeAddress || !algosdk.isValidAddress(activeAddress)) {
    throw new Error(`❌ Invalid or missing address: ${activeAddress}`)
  }

  console.log('📤 Fetching suggestedParams...')
  const suggestedParams = await algodClient.getTransactionParams().do()

  console.log('🛠️ Creating asset creation transaction...')
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    sender: activeAddress,
    total: 1,
    decimals: 0,
    assetName: 'MasterPass NFT',
    unitName: 'MSTR',
    assetURL: NFT_METADATA_URL,
    defaultFrozen: false,
    manager: activeAddress,
    suggestedParams,
  })

  console.log('✍️ Signing with wallet...')
  const [signedTxn] = await signTransactions([txn])

  const rawTxn =
    typeof signedTxn === 'string'
      ? new Uint8Array(Buffer.from(signedTxn, 'base64'))
      : signedTxn

  console.log('📡 Sending to network...')
  const { txid } = await algodClient.sendRawTransaction(rawTxn).do()
  console.log('txId:', txid)

  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txid, 4)
  const assetId = confirmedTxn['assetIndex']
  console.log('✅ NFT minted! Asset ID:', assetId)

  return assetId !== undefined ? Number(assetId) : undefined
}
