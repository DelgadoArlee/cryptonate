import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Balance from '../Balance'
import { DonateButton } from '../Buttons'
import { Typography } from '@mui/material'
 
function Connect() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <>
        <Typography variant="h5">
        User Address: 
        </Typography>
        <Typography variant="h5">
        {address}
        </Typography>
        <button onClick={() => disconnect()}>Disconnect</button>
        <Balance/>
        <DonateButton/>
      </>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Connect