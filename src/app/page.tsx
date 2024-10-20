import { TonConnectProvider } from '@/components/TonConnectProvider'
import dynamic from 'next/dynamic'

const WalletScreen = dynamic(() => import('@/components/WalletScreen'), {
    ssr: false,
})

export default function Home() {
    return (
        <TonConnectProvider>
            <WalletScreen />
        </TonConnectProvider>
    )
}
