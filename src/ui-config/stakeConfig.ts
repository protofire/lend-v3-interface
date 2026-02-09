import { ChainId } from '@aave/contract-helpers';

export interface StakeConfig {
  chainId: ChainId;
  stakeDataProvider: string;
  tokens: {
    [token: string]: {
      TOKEN_STAKING: string;
      STAKING_REWARD_TOKEN: string;
      STAKING_HELPER?: string;
    };
  };
}

export const stakeConfig: StakeConfig = {
  chainId: ChainId.harmony, // Use Harmony so getProvider() doesn't crash
  stakeDataProvider: '0x0000000000000000000000000000000000000000',
  tokens: {},
};
