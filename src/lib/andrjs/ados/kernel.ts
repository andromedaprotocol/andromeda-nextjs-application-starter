/**
 * Queries for the kernel contract
 */
export namespace KERNEL {
    export enum KernelKey {
        VFS = "vfs",
        ECONOMICS = "economics",
        ADODB = "adodb",
    }

    export const keyAddressMsg = (key: KernelKey) => {
        return {
            key_address: { key },
        };
    };

    export type KeyAddressResponse = string;
}
