'use client';

import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Link from 'next/link';
import { toNano, Address } from 'ton-core';
import { useWalletBalance } from '@/hooks/useWalletBalance';

const TransactionScreen: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const { balance, error: balanceError } = useWalletBalance();
    const [amount, setAmount] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTransactionStatus(null);

        try {
            if (!tonConnectUI.account) {
                throw new Error('Кошелек не подключен');
            }

            const amountNano = toNano(amount);
            const recipientAddr = Address.parse(recipientAddress);

            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
                messages: [
                    {
                        address: recipientAddr.toString(),
                        amount: amountNano.toString(),
                    },
                ],
            };

            const result = await tonConnectUI.sendTransaction(transaction);

            if (result) {
                setTransactionStatus('Транзакция успешно отправлена');
                setAmount('');
                setRecipientAddress('');
            } else {
                setTransactionStatus('Ошибка при отправке транзакции');
            }
        } catch (error) {
            console.error('Ошибка при отправке транзакции:', error);
            setTransactionStatus(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-blue-500 text-white">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-white hover:text-blue-200">
                        &larr; Назад
                    </Link>
                    {balance !== null && !balanceError && (
                        <div className="text-xl font-bold">
                            {balance} TON
                        </div>
                    )}
                    {balanceError && (
                        <div className="text-xl font-bold text-red-300">
                            Ошибка загрузки баланса
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-grow p-4">
                {balanceError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {balanceError}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block mb-2 font-bold">Количество TON:</label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="recipientAddress" className="block mb-2 font-bold">Адрес получателя:</label>
                        <input
                            type="text"
                            id="recipientAddress"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isLoading || !!balanceError}
                    >
                        {isLoading ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
                {transactionStatus && (
                    <div className={`mt-4 p-3 rounded-lg ${
                        transactionStatus.includes('успешно') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {transactionStatus}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TransactionScreen;
