import { useBalance } from 'wagmi'

function Balance() {
    const { data, isError, isLoading } = useBalance({
      address: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
    })
   
    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
      <div>
        Balance: {data?.formatted} {data?.symbol}
      </div>
    )
}

export default Balance