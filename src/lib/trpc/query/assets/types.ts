export interface IAppComponent {
  name: string;
  appAddress: string;
  chainId: string;
  addHash: string;
  addHeight: number;
  address: string;
  adoType: string;
  lastUpdatedHash: string;
  lastUpdatedHeight: number;
  symlink: string;
}

export interface IADO {
  chainId: string;
  address: string;
  adoType: string;
  memo: string;
  instantiateHeight: number;
  instantiateHash: string;
  lastUpdatedHash: string;
  lastUpdatedHeight: number;
  instantiateOwner: string;
  owner: string;
  disowned: boolean;
  minter: string;
  name: string;
  kernel: string;
}
