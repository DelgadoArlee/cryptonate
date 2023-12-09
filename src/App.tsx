import { WagmiConfig } from 'wagmi';
import Connect from './components/Connect';

function App() {
  return (
    <WagmiConfig config={config}>
      <Connect />
    </WagmiConfig>
  );
}

export default App;
