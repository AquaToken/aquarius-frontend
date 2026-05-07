import { ENV_PRODUCTION, ENV_TESTNET } from 'constants/env';

export type Environment = typeof ENV_TESTNET | typeof ENV_PRODUCTION;
