import styles from '../styles/Home.module.css'
import InstructionsComponent from '../components/InstructionsComponent'
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import myContract from '../abis/MyContract.json'

export default function Home () {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { config } = usePrepareContractWrite({
    address: '0xAcf9FD890F06e6F200339193a64c0952a164Cb9d',
    abi: myContract.abi,
    functionName: 'mint',
    args: [address, 10000]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div>
      <main className={styles.main}>
        <button disabled={!write} onClick={() => write?.()}>
          Mint
        </button>

        <p>{isLoading && <div>Check Wallet</div>}</p>
        <p> {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}</p>
      </main>
    </div>
  )
}
