import { TonConnectProvider } from '@/components/TonConnectProvider'
import dynamic from 'next/dynamic'

const TransactionScreen = dynamic(() => import('@/components/TransactionScreen'), {
    ssr: false,
})

export default function TransactionPage() {
    return (
        <TonConnectProvider>
            <TransactionScreen />
        </TonConnectProvider>
    )
}
