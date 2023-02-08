import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/m-plus-rounded-1c";
import "@fontsource/open-sans";

import Layout from "../components/Layout";

import client from "../apollo-client.js";
import { ApolloProvider } from "@apollo/client";

//web3modal
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import {  goerli } from '@wagmi/core'


export const theme = extendTheme({
  fonts: {
    heading: "M PLUS Rounded 1c",
    body: "Open Sans",
  },
});

const MyApp = ({ Component, pageProps }) => {
  const chains = [goerli];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: process.env.NEXT_PUBLIC_PROJECT_ID }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
      </ChakraProvider>
      <Web3Modal
        projectId= {process.env.NEXT_PUBLIC_PROJECT_ID}
        ethereumClient={ethereumClient}
      
      />
    </ApolloProvider>
  );
};

export default MyApp;
