// useTokenBalance.ts

import { useState } from "react";
import { ethers } from "ethers";


export const ETH_ADDRESS = "ETH";
export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export default function useTokenBalance(provider: ethers.BrowserProvider | null, account: string | null) {
  const [balance, setBalance] = useState<string | null>(null);

  const getBalance = async (tokenAddress: string) => {
    if (!provider || !account) {
      console.warn("Wallet not connected");
      setBalance(null);
      return;
    }

    try {
      if (tokenAddress === ETH_ADDRESS) {
        const rawBalance = await provider.getBalance(account);
        setBalance(ethers.formatEther(rawBalance));
      } else {
        const erc20Abi = [
          "function balanceOf(address) view returns (uint256)",
          "function decimals() view returns (uint8)",
        ];
        const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
        const rawBalance = await contract.balanceOf(account);
        const decimals = await contract.decimals();
        setBalance(ethers.formatUnits(rawBalance, decimals));
      }
    } catch (err) {
      console.error("Failed to fetch token balance:", err);
      setBalance(null);
    }
  };

  return { balance, getBalance, ETH_ADDRESS, USDC_ADDRESS };
}




