import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { fromNano, Address } from 'ton-core';
import { TonClient } from 'ton';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryWithExponentialBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries = 5,
    baseDelay = 1000
): Promise<T> => {
    let lastError: Error | null = null;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            if (i === maxRetries - 1) break;
            await delay(baseDelay * Math.pow(2, i));
        }
    }
    throw lastError || new Error('Max retries reached');
};

export const useWalletBalance = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = useCallback(async () => {
        if (tonConnectUI.account?.address) {
            try {
                const client = new TonClient({
                    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
                });
                const rawBalance = await retryWithExponentialBackoff(() =>
                    client.getBalance(Address.parse(tonConnectUI.account!.address))
                );
                setBalance(fromNano(rawBalance));
                setError(null);
            } catch (error) {
                console.error('Ошибка при получении баланса:', error);
                setBalance(null);
                setError('Не удалось получить баланс. Пожалуйста, попробуйте позже.');
            }
        } else {
            setBalance(null);
            setError(null);
        }
    }, [tonConnectUI.account]);

    useEffect(() => {
        fetchBalance();
        const intervalId = setInterval(fetchBalance, 10000);
        return () => clearInterval(intervalId);
    }, [fetchBalance]);

    return { balance, error };
};
