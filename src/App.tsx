import { WagmiConfig } from 'wagmi';
import Connect from './components/Connect';
import cryptonateConfig from './config/wagmi';

function App() {
  return (
    <WagmiConfig config={cryptonateConfig}>
      <Connect />
    </WagmiConfig>
  );
}

export default App;
