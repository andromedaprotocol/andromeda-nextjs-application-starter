export interface IChainConfig {
  name: string;
  displayName: string;
  chainId: string;
  // @deprecated - use displayName instead
  chainName: string;
  chainUrl: string;
  addressPrefix: string;
  defaultFee: string;
  blockExplorerTxPages: string[];
  blockExplorerAddressPages: string[];
  chainType: string;
  iconUrls: {
    sm: string;
    lg: string;
  };
  kernelAddress: string;
  enabled: boolean;
  registryAddress: string;
  lcdUrl: string;
  grpcUrl: string;
}

interface IKeplrCurrency {
  coinDecimals: number;
  coinDenom: string;
  coinMinimalDenom: string;
  coinImageUrl?: string;
  coinGeckoId?: string;
}
interface IKeplrFeeCurrency extends IKeplrCurrency {
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
}

export interface IKeplrConfig {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: IKeplrCurrency[];
  feeCurrencies: IKeplrFeeCurrency[];
  stakeCurrency: IKeplrCurrency;
  features: string[];
  gasPriceStep: IKeplrFeeCurrency["gasPriceStep"];
  coinType: number;
}
