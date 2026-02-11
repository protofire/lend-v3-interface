import { ChainId } from '@aave/contract-helpers';
import { AaveV3Harmony } from '@bgd-labs/aave-address-book';
import { ReactNode } from 'react';

// Enable for premissioned market
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';
export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  // the network the market operates on
  chainId: ChainId;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
    withdrawAndSwitch?: boolean;
    switch?: boolean;
  };
  isFork?: boolean;
  permissionComponent?: ReactNode;
  disableCharts?: boolean;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    WITHDRAW_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
    V3_MIGRATOR?: string;
    GHO_TOKEN_ADDRESS?: string;
    GHO_UI_DATA_PROVIDER?: string;
  };
  /**
   * https://www.hal.xyz/ has integrated aave for healtfactor warning notification
   * the integration doesn't follow aave market naming & only supports a subset of markets.
   * When a halIntegration is specified a link to hal will be displayed on the ui.
   */
  halIntegration?: {
    URL: string;
    marketName: string;
  };
};
export enum CustomMarket {
  // v3 test networks, all v3.0.1
  proto_harmony_testnet_v3 = 'proto_harmony_testnet_v3',
  // v3 mainnets
  proto_harmony_v3 = 'proto_harmony_v3',
}

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_harmony_v3]: {
    marketTitle: 'Harmony',
    v3: true,
    chainId: ChainId.harmony,
    enabledFeatures: {
      incentives: true,
    },
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-harmony',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Harmony.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Harmony.POOL,
      WETH_GATEWAY: AaveV3Harmony.WETH_GATEWAY,
      WALLET_BALANCE_PROVIDER: AaveV3Harmony.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Harmony.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Harmony.UI_INCENTIVE_DATA_PROVIDER,
      COLLECTOR: AaveV3Harmony.COLLECTOR,
    },
  },
  [CustomMarket.proto_harmony_testnet_v3]: {
    marketTitle: 'Harmony Testnet',
    v3: true,
    chainId: ChainId.harmony_testnet,
    enabledFeatures: {
      incentives: false,
    },
    subgraphUrl: 'https://graph.swap.w3us.site/subgraphs/name/lend/harmony-testnet-v3',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x0DCD65B6bC456022feDb9Bd084e7b0FEb0d45404',
      LENDING_POOL: '0x61007e991f95bdC9cf2908b168a289dA486112AF',
      WETH_GATEWAY: '0xf2d76928e3E215CFC2Fb54f0ECB2Ef1eCFd320ac',
      WALLET_BALANCE_PROVIDER: '0x53199ccB45714c10d447Ee1cb2b6af7CC64cdDd0',
      UI_POOL_DATA_PROVIDER: '0x209B2b23a28b8645BE138a2c3780Ae506c5b17B8',
      FAUCET: '0x0fF3e3595114D8db03b33DE55C617d9C85B28B6e',
      UI_INCENTIVE_DATA_PROVIDER: '0x5416fDB8475c1601BC9e985a3e259911C5edDe79',
      // COLLECTOR: ,
    },
  },
} as const;
