import DAVTokenABI from "../ABI/DavTokenABI.json";
import StateABI from "../ABI/StateTokenABI.json";
import SwapContractABI from "../ABI/SwapContractABI.json";
import { Auction_TESTNET, DAV_TESTNET, STATE_TESTNET } from "./ContractAddresses";


export const getContractConfigs = () => ({
	davContract: { address: DAV_TESTNET, abi: DAVTokenABI },
	AuctionContract: { address: Auction_TESTNET, abi: SwapContractABI },
	stateContract: { address: STATE_TESTNET, abi: StateABI },
});
