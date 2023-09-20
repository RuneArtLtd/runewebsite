"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_ID } from "../constants/chain";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter, LOGIN_PROVIDER } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  configureChains,
  WagmiConfig,
  createConfig,
  mainnet,
  type WebSocketPublicClient,
  type PublicClient,
  type Config,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { type FallbackTransport } from "viem";
import { goerli } from "@wagmi/core/chains";
import { ConnectKitProvider } from "connectkit";
import { siweClient } from "../utils/siweClient";
import { WalletConnectModal } from "../components/WalletConnection/WalletConnectModal";
import { AuthHelper } from "./AuthHelper";

interface WalletContextType {
  web3Auth: Web3AuthNoModal | undefined;
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (isOpen: boolean) => void;

  init: () => void;
}

const WalletContext = createContext<WalletContextType>({
  web3Auth: undefined,
  isConnectModalOpen: false,
  setIsConnectModalOpen: () => undefined,
  init: () => undefined,
});

const loginProviderOptions = [
  LOGIN_PROVIDER.GOOGLE,
  LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
  LOGIN_PROVIDER.SMS_PASSWORDLESS,
  LOGIN_PROVIDER.TWITTER,
  LOGIN_PROVIDER.APPLE,
  LOGIN_PROVIDER.DISCORD,
];

const clientId =
  "BIf1HAPv41M4L0Ai7RG9gm2VrC-vCHBGynPKOkpl4tF3NnoPGhmgGCd1ncVFj42oDn2bjXgxUZ-vo0p7-vOJ04I";
const walletConnectProjectId = "b96f026115bf38eae90af7467fe9b643";
const appName = "RuneNFT";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: CHAIN_ID === 1 ? "0x1" : "0x5", // Please use 0x5 for Goerli Testnet
  rpcTarget:
    CHAIN_ID === 1
      ? `https://eth-mainnet.g.alchemy.com/v2/${
          process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY || ""
        }`
      : `https://eth-goerli.g.alchemy.com/v2/${
          process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY || ""
        }`,
  name: CHAIN_ID === 1 ? "Ethereum Mainnet" : "Goerli",
  tickerName: "Ether",
  ticker: "ETH",
  displayName: CHAIN_ID === 1 ? "Ethereum Mainnet" : "Goerli",
  blockExplorer:
    CHAIN_ID === 1 ? "https://etherscan.io/" : "https://goerli.etherscan.io/",
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [CHAIN_ID === 1 ? mainnet : goerli],
  [publicProvider()]
);

export const WalletWrapper = ({ children }: { children: ReactNode }) => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [web3Auth, setWeb3Auth] = useState<Web3AuthNoModal | undefined>(
    undefined
  );
  const [wagmiConfig, setWagmiConfig] = useState<Config<
    PublicClient<FallbackTransport>,
    WebSocketPublicClient<FallbackTransport>
  > | null>(null);

  const init = () => {
    const web3AuthInstance = new Web3AuthNoModal({
      chainConfig,
      clientId,
      web3AuthNetwork: CHAIN_ID === 1 ? "cyan" : "testnet",
    });
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
    });

    const openloginAdapterInstance = new OpenloginAdapter({
      privateKeyProvider,
      adapterSettings: {
        uxMode: "redirect",
        clientId,
        network: CHAIN_ID === 1 ? "cyan" : "testnet",
        whiteLabel: {
          name: appName,
          url: "https://www.rune.art",
          logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
          logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
          defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
          dark: true, // whether to enable dark mode. defaultValue: false
          theme: {
            primary: "#F51281",
          },
        },
      },
      loginSettings: {
        // redirectUrl: window.location.href + "/mint",
      },
    });
    web3AuthInstance.configureAdapter(openloginAdapterInstance);

    setWeb3Auth(web3AuthInstance);

    const Web3Connectors = loginProviderOptions.map((loginProvider) => {
      return new Web3AuthConnector({
        chains,
        options: {
          web3AuthInstance,
          loginParams: {
            loginProvider: loginProvider,
          },
        },
      });
    });

    setWagmiConfig(
      createConfig({
        autoConnect: true,
        connectors: [
          ...Web3Connectors,
          new InjectedConnector({
            chains,
            options: {
              name: "Injected",
              shimDisconnect: true,
            },
          }),
          new MetaMaskConnector({ chains }),
          new CoinbaseWalletConnector({
            chains,
            options: {
              appName: appName,
              headlessMode: true,
            },
          }),
          new WalletConnectConnector({
            chains,
            options: {
              projectId: walletConnectProjectId,
              showQrModal: false,
            },
          }),
        ],
        publicClient,
        webSocketPublicClient,
      })
    );
  };

  useEffect(() => {
    void init();
  }, []);

  const settings = {
    web3Auth,
    isConnectModalOpen,
    setIsConnectModalOpen,
    init,
  };

  if (!wagmiConfig) return null;

  return (
    <WagmiConfig config={wagmiConfig}>
      <siweClient.Provider
        // Optional parameters
        enabled={true} // defaults true
        nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        signOutOnDisconnect={true} // defaults true
        signOutOnAccountChange={true} // defaults true
        signOutOnNetworkChange={true} // defaults true
        onSignIn={() => {
          // handleSignIn(session);
        }}
        onSignOut={() => {
          // console.log("signout");
        }}
      >
        <ConnectKitProvider
          options={{ disableSiweRedirect: true }}
          theme="midnight"
        >
          <WalletContext.Provider value={settings}>
            <WalletConnectModal />
            <AuthHelper>{children}</AuthHelper>
          </WalletContext.Provider>
        </ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
};

export const useWalletContext = () => {
  return useContext(WalletContext);
};
