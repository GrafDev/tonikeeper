'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { PropsWithChildren, useEffect, useState } from 'react'

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function TonConnectProvider({ children }: PropsWithChildren) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // или можно вернуть заглушку для серверного рендеринга
    }

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            {children}
        </TonConnectUIProvider>
    )
}
