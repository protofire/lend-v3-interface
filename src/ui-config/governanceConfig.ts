import { ChainId } from '@aave/contract-helpers';

export interface GovernanceConfig {
  chainId: ChainId;
  walletBalanceProvider: string;
  votingAssetName: string;
  averageNetworkBlockTime: number;
  queryGovernanceDataUrl: string;
  wsGovernanceDataUrl: string;
  aaveTokenAddress: string;
  aAaveTokenAddress: string;
  stkAaveTokenAddress: string;
  governanceForumLink: string;
  governanceSnapshotLink: string;
  governanceFAQLink: string;
  addresses: {
    AAVE_GOVERNANCE_V2: string;
    AAVE_GOVERNANCE_V2_EXECUTOR_SHORT: string;
    AAVE_GOVERNANCE_V2_EXECUTOR_LONG: string;
    AAVE_GOVERNANCE_V2_HELPER: string;
  };
  ipfsGateway: string;
  fallbackIpfsGateway: string;
}

export const governanceConfig: GovernanceConfig = {
  chainId: ChainId.harmony, // Use Harmony so getProvider() doesn't crash
  votingAssetName: 'N/A',
  averageNetworkBlockTime: 2,
  queryGovernanceDataUrl: '',
  wsGovernanceDataUrl: '',
  aaveTokenAddress: '0x0000000000000000000000000000000000000000',
  aAaveTokenAddress: '0x0000000000000000000000000000000000000000',
  stkAaveTokenAddress: '0x0000000000000000000000000000000000000000',
  governanceForumLink: '',
  governanceFAQLink: '',
  walletBalanceProvider: '0x0000000000000000000000000000000000000000',
  governanceSnapshotLink: '',
  addresses: {
    AAVE_GOVERNANCE_V2: '0x0000000000000000000000000000000000000000',
    AAVE_GOVERNANCE_V2_EXECUTOR_SHORT: '0x0000000000000000000000000000000000000000',
    AAVE_GOVERNANCE_V2_EXECUTOR_LONG: '0x0000000000000000000000000000000000000000',
    AAVE_GOVERNANCE_V2_HELPER: '0x0000000000000000000000000000000000000000',
  },
  ipfsGateway: 'https://cloudflare-ipfs.com/ipfs',
  fallbackIpfsGateway: 'https://ipfs.io/ipfs',
};
