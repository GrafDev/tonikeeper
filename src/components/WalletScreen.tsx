'use client';

import React, { useState, useEffect } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import Link from 'next/link';
import { useWalletBalance } from '@/hooks/useWalletBalance';

const WalletScreen: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const { balance, error } = useWalletBalance();
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            setIsConnecting(true);
            try {
                await tonConnectUI.connectionRestored;
            } finally {
                setIsConnecting(false);
            }
        };

        checkConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                setIsConnecting(false);
            } else {
                setIsConnecting(true);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI]);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-blue-500 text-white">
                <div className="flex justify-between items-center">
                    {balance !== null && !error && (
                        <div className="text-xl font-bold">
                            {balance} TON
                        </div>
                    )}
                    {error && (
                        <div className="text-xl font-bold text-red-300">
                            Ошибка загрузки баланса
                        </div>
                    )}
                    <div/>
                    <TonConnectButton />
                </div>
            </header>
            <main className="flex-grow p-4">
                {isConnecting ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-lg text-gray-600">Подключение к кошельку...</p>
                    </div>
                ) : tonConnectUI.account ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Адрес кошелька:</h2>
                        <p className="break-all bg-gray-100 p-4 rounded-lg shadow-inner">
                            {tonConnectUI.account.address}
                        </p>
                        {error && (
                            <p className="mt-4 text-red-500">{error}</p>
                        )}
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-xl mb-4">Используйте кнопку в правом верхнем углу, чтобы подключить кошелек</p>
                    </div>
                )}
            </main>
            <footer className="p-4">
                <Link href="/transaction" className="block w-full bg-blue-500 text-white text-center px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    Новая транзакция
                </Link>
            </footer>
        </div>
    );
};

export default WalletScreen;
