import { ReactNode } from 'react';
import { WalletConnectorPrivyProvider, Network } from '@orderly.network/wallet-connector-privy';
import type { NetworkId } from "@orderly.network/types";
import { QueryClient } from "@tanstack/query-core";
import { getEvmConnectors, getSolanaConfig } from '../../utils/walletConfig';

const PrivyConnector = ({ children, networkId }: {
  children: ReactNode;
  networkId: NetworkId;
}) => {
  const appId = import.meta.env.VITE_PRIVY_APP_ID;
  const termsOfUseUrl = import.meta.env.VITE_PRIVY_TERMS_OF_USE;
  const enableAbstractWallet = import.meta.env.VITE_ENABLE_ABSTRACT_WALLET === 'true';
  const disableEVMWallets = import.meta.env.VITE_DISABLE_EVM_WALLETS === 'true';
  const disableSolanaWallets = import.meta.env.VITE_DISABLE_SOLANA_WALLETS === 'true';

  return (
    <WalletConnectorPrivyProvider
      network={networkId === 'mainnet' ? Network.mainnet : Network.testnet}
      termsOfUse={termsOfUseUrl}
      wagmiConfig={disableEVMWallets ? undefined : {
        connectors: getEvmConnectors()
      }}
      solanaConfig={disableSolanaWallets ? undefined : getSolanaConfig(networkId)}
      privyConfig={{
        config: {
          appearance: {
            showWalletLoginFirst: false,
          },
        },
        appid: appId,
      }}
      abstractConfig={enableAbstractWallet ? {
        queryClient: new QueryClient(),
      } : undefined}
    >
      {children}
    </WalletConnectorPrivyProvider>
  );
};

export default PrivyConnector; 