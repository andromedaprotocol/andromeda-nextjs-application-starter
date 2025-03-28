import AndromedaClient from '@andromedaprotocol/andromeda.js';
import { SplitterConfig, SplitterInstance, SplitterState } from './types';

export class SplitterService {
  private client: AndromedaClient;

  constructor(client: AndromedaClient) {
    this.client = client;
  }

  async createSplitter(config: SplitterConfig): Promise<SplitterInstance> {
    // Create a new splitter contract instance
    const contract = await this.client.instantiate(
      parseInt(process.env.NEXT_PUBLIC_SPLITTER_CODE_ID!),
      {
        recipients: config.recipients,
        owner: config.owner,
      },
      "Splitter Contract"
    );

    return {
      address: contract.contractAddress,
      config,
    };
  }

  async useExistingSplitter(vfsReference: string): Promise<SplitterInstance> {
    // Load existing splitter from VFS reference
    const state = await this.getSplitterState(vfsReference);
    
    return {
      address: vfsReference,
      config: {
        recipients: state.recipients,
        owner: state.owner,
      },
      vfsReference,
    };
  }

  async getSplitterState(address: string): Promise<SplitterState> {
    return await this.client.queryContract(address, {
      get_state: {},
    });
  }

  async splitFunds(address: string, amount: string): Promise<void> {
    await this.client.execute(address, {
      split: {
        amount,
      },
    });
  }

  async updateRecipients(address: string, recipients: SplitterConfig['recipients']): Promise<void> {
    await this.client.execute(address, {
      update_recipients: {
        recipients,
      },
    });
  }
} 