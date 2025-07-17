// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import { WalletButton } from '@txnlab/use-wallet-ui-react'
import React, { useState } from 'react'

const Home: React.FC = () => {
  const { activeAddress } = useWallet()
  const [hasClaimed, setHasClaimed] = useState(false)

  const handleClaim = () => {
    setHasClaimed(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-purple-400 to-pink-400">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to MasterPass 🎟️
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Your ticket to join exclusive Web3 events.
        </p>

        <div className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <WalletButton />
        </div>

        {/* Get MasterPass Button */}
        {!hasClaimed ? (
          <button
            onClick={handleClaim}
            className="btn w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Get Your MasterPass
          </button>
        ) : (
          <div className="text-green-600 font-semibold mt-4">
            NFT & Token features coming soon in Session 4 & 5 🚀
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
