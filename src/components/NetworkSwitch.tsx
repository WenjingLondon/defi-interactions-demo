// src/components/NetworkSwitch.tsx


declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function NetworkSwitch() {
  const switchNetwork = async (chainId: number) => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chainId.toString(16) }],
      });
      console.log("Switched network to", chainId);
    } catch (switchError: any) {
      
      if (switchError.code === 4902) {
        alert("Network not added in MetaMask");
      } else {
        console.error("Failed to switch network:", switchError);
      }
    }
  };

  return (
    <div className="mb-4">
      <span className="mr-2 font-medium">Switch Network:</span>
      <button
        onClick={() => switchNetwork(1)}
        className="px-2 py-1 border rounded mr-2 hover:bg-gray-100"
      >
        Mainnet
      </button>
      <button
        onClick={() => switchNetwork(11155111)}
        className="px-2 py-1 border rounded hover:bg-gray-100"
      >
        Sepolia
      </button>
    </div>
  );
}
