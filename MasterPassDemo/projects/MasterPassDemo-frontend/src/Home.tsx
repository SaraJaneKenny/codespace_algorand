// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import { WalletButton } from '@txnlab/use-wallet-ui-react'
import React, { useState } from 'react'
import { mintNft } from './components/MintNFT'

const Home: React.FC = () => {
  const {
    activeAddress,
    signTransactions,
    algodClient,
  } = useWallet()

  const [hasClaimed, setHasClaimed] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintedAssetId, setMintedAssetId] = useState<number | null>(null)

  const handleClaim = async () => {
    console.log('🔍 Wallet Info:', { activeAddress, signTransactions, algodClient })

    if (!activeAddress || !signTransactions || !algodClient) {
      alert('❌ Please connect your wallet first.')
      return
    }

    try {
      setIsMinting(true)
      console.log('⚙️ Minting NFT for:', activeAddress)

      const assetId = await mintNft(activeAddress, signTransactions, algodClient)

      if (assetId) {
        console.log('✅ NFT minted! Asset ID:', assetId)
        setMintedAssetId(assetId)
        setHasClaimed(true)
      } else {
        alert('❌ NFT minting failed.')
      }
    } catch (err) {
      console.error('❌ Error minting NFT:', err)
      alert('❌ Failed to mint NFT. See console for details.')
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-purple-400 to-pink-400">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MasterPass 🎟️</h1>
        <p className="text-lg mb-6 text-gray-600">Your ticket to join exclusive Web3 events.</p>

        {/* Wallet Connect Button */}
        <div className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
          <WalletButton />
        </div>

        {!activeAddress && (
          <div className="text-red-500 font-semibold mb-2">
            Please connect your wallet first.
          </div>
        )}

        {/* Claim Button */}
        {!hasClaimed ? (
          <button
            onClick={handleClaim}
            disabled={isMinting || !activeAddress}
            className={`btn w-full ${
              activeAddress
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isMinting ? 'Minting...' : 'Get Your MasterPass'}
          </button>
        ) : (
          <>
            <div className="text-green-600 font-semibold mt-4">
              🎉 NFT minted successfully!
            </div>
            {mintedAssetId && (
              <a
                href={`https://testnet.explorer.perawallet.app/asset/${mintedAssetId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 underline font-medium"
              >
                View NFT on Pera Explorer
              </a>
            )}
            <div className="text-gray-700 font-medium mt-4">
              NFT & Token features coming soon in Session 4 & 5 🚀
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
