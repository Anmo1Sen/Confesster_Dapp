import { ethers } from "ethers";
import Contract from "./Confesster.json";
import { contractAddress } from "../config";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
  return contract;
}


export const checkIfWalletIsConnect = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
