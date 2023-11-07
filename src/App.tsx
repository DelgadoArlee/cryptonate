import './App.css'
import { WagmiConfig, createConfig, sepolia } from 'wagmi'
import { createPublicClient, http } from 'viem'
import Connect from './components/Connect'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http("https://eth-sepolia.g.alchemy.com/v2/H-WSGl1TPXnOPP0PRU93oLyvE2ZCwl9n")
  }),
})

function App() {

  return (
    <WagmiConfig config={config}>
         <Connect/>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </WagmiConfig>
  )
}

export default App
