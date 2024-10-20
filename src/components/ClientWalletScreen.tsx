import { TonConnectProvider } from '@/components/TonConnectProvider'
import ClientWalletScreen from '@/components/ClientWalletScreen'
import Link from 'next/link'

export default function Home() {
    return (
        <TonConnectProvider>
            <ClientWalletScreen />
            <div className="fixed bottom-4 right-4">
                <Link href="/transaction" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Новая транзакция
                </Link>
            </div>
        </TonConnectProvider>
    )
}
