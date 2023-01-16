import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { GameProvider, useGameContext } from "contexts/gameContext";
import { WagmiConfig, createClient } from "wagmi";
import { configureChains, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { game } = useGameContext();
  const chains = [goerli];
  const { provider, webSocketProvider } = configureChains(chains, [
    publicProvider(),
  ]);
  const { connectors } = getDefaultWallets({
    appName: "Decentralized Chess",
    chains,
  });

  const client = createClient({
    autoConnect: true,
    provider: provider,
    connectors: connectors,
    webSocketProvider,
  });

  return (
    <>
      <Head>
        <title>NextJS Base</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig client={client}>
            <RainbowKitProvider chains={chains}>
              <GameProvider value={game}>
                <ConnectButton />
                <Component {...pageProps} />
              </GameProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </main>
    </>
  );
}
