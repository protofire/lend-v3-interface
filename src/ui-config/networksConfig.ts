import { ChainId } from '@aave/contract-helpers';

export type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

export type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

export type NetworkConfig = {
  name: string;
  displayName?: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  // protocolDataUrl: string;
  // https://github.com/aave/aave-api
  ratesHistoryApiUrl?: string;
  // cachingServerUrl?: string;
  // cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  /**
   * When this is set withdrawals will automatically be unwrapped
   */
  wrappedBaseAssetSymbol: string;
  baseAssetSymbol: string;
  // needed for configuring the chain on metemask when it doesn't exist yet
  baseAssetDecimals: number;
  // usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  // set this to show faucets and similar
  isTestnet?: boolean;
  // get's automatically populated on fork networks
  isFork?: boolean;
  networkLogoPath: string;
  // contains the forked off chainId
  underlyingChainId?: number;
  bridge?: {
    icon: string;
    name: string;
    url: string;
  };
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.harmony]: {
    name: 'Harmony',
    privateJsonRPCUrl: 'https://harmony-0.gateway.pokt.network/v1/lb/62b3314e123e6f00397f19ca',
    publicJsonRPCUrl: [
      'https://api.s0.t.hmny.io',
      'https://api.harmony.one',
      'https://rpc.ankr.com/harmony',
    ],
    publicJsonRPCWSUrl: 'wss://ws.s0.t.hmny.io',
    // protocolDataUrl: '',
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ONE',
    wrappedBaseAssetSymbol: 'WONE',
    baseAssetDecimals: 18,
    explorerLink: 'https://explorer.harmony.one',
    // usdMarket: true,
    networkLogoPath: '/icons/networks/harmony.svg',
    bridge: {
      icon: '/icons/bridge/harmony.svg',
      name: 'Harmony Bridge',
      url: 'https://bridge.harmony.one',
    },
    ratesHistoryApiUrl: 'https://aave-api-v2.aave.com/data/rates-history',
  },
  [ChainId.harmony_testnet]: {
    name: 'Harmony Testnet',
    privateJsonRPCUrl: 'https://api.s0.b.hmny.io',
    publicJsonRPCUrl: ['https://api.s0.b.hmny.io'],
    // publicJsonRPCWSUrl: 'wss://ws.s0.t.hmny.io',
    // protocolDataUrl: '',
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'ONE',
    wrappedBaseAssetSymbol: 'WONE',
    baseAssetDecimals: 18,
    explorerLink: 'https://explorer.testnet.harmony.one',
    // usdMarket: true,
    isTestnet: true,
    networkLogoPath: '/icons/networks/harmony.svg',
    bridge: {
      icon: '/icons/bridge/harmony.svg',
      name: 'Harmony Bridge',
      url: 'https://bridge.harmony.one',
    },
    ratesHistoryApiUrl: 'https://lend-api.stg.w3us.site/data/rates-history',
  },
} as const;
