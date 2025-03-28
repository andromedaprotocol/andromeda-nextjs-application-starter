import { Coin } from '@cosmjs/stargate';

export interface Recipient {
  address: string;
  percentage: number;
}

export interface SplitterConfig {
  recipients: Recipient[];
  owner: string;
}

export interface SplitterInstance {
  address: string;
  config: SplitterConfig;
  vfsReference?: string;
}

export interface SplitterState {
  balance: Coin[];
  recipients: Recipient[];
  owner: string;
} 