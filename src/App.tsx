import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { createPublicClient, http } from 'viem';
import Connect from './components/Connect';

const fetchOptions: RequestInit = {
  mode: 'cors',
};

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(import.meta.env.VITE_RPC_URL, { fetchOptions }),
  }),
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Connect />
    </WagmiConfig>
  );
}

export default App;
