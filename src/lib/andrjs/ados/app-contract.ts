/**
 * Queries for the kernel contract
 */
export namespace APP_CONTRACT {
  export const getComponentsMsg = () => {
    return {
      get_components: {},
    };
  };

  export type GetComponentsResponse = { name: string; ado_type: string }[];

  export const getAddressesWithNamesMsg = () => {
    return {
      get_addresses_with_names: {},
    };
  };

  export type GetAddressesWithNamesResponse = {
    name: string;
    address: string;
  }[];
}
