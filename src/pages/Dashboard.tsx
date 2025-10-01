
// src/pages/Dashboard.tsx

import useWallet from "../hooks/useWallet";
import useTokenBalance, { ETH_ADDRESS, USDC_ADDRESS } from "../hooks/useTokenBalance";

export default function Dashboard() {
  const { account, provider, connectWallet, disconnectWallet } = useWallet();
  const { balance, getBalance } = useTokenBalance(provider, account);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="text-gray-700 font-medium mb-4">Connected account:</div>
            <div className="text-gray-900 font-mono mb-3 break-all">{account}</div>
            <button
              onClick={disconnectWallet}
              className="w-full py-2 mb-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Disconnect Wallet
            </button>

            <hr className="my-4" />

            <div className="flex justify-between mb-3">
              <button
                onClick={() => getBalance(ETH_ADDRESS)}
                className="flex-1 py-2 mr-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
              >
                Check ETH Balance
              </button>
              <button
                onClick={() => getBalance(USDC_ADDRESS)}
                className="flex-1 py-2 ml-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
              >
                Check USDC Balance
              </button>
            </div>

            {balance !== null && (
              <div className="mt-4 text-center text-gray-900 font-semibold text-lg">
                Balance: {balance}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
