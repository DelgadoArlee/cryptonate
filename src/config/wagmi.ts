import { createConfig, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { hardhat, sepolia } from 'viem/chains';

const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
    publicProvider(),
  ],
);

const connectors = [new MetaMaskConnector({ chains })];

// const fetchOptions: RequestInit = {
//   mode: 'cors',
// };

const cryptonateConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default cryptonateConfig;
