import { getLcdClientErrorMessage, LcdClientError } from "./error";
import { ClientOptions } from "./types";

/**
 * LCD client for Andromeda.
 * @template T - The type of the data returned from the LCD client.
 * @template Q - The type of the query parameters.
 */
export class LcdClient {
  base_url: string;
  options: ClientOptions;
  constructor(base_url: string, options: ClientOptions = {}) {
    this.base_url = base_url;
    this.options = options;
  }

  async get<T>(
    path: string,
    options: ClientOptions = this.options,
  ): Promise<T> {
    const url = `${this.base_url}/${path}`;
    return fetch(url, options).then(async (response): Promise<T> => {
      if (response.status === 502) {
        throw new LcdClientError({
          message: "Bad Gateway",
          data: {},
          response,
        });
      }
      try {
        const data = await response.json();
        // Look for specific errors returned from OK response
        if (response.ok && typeof data === "object") {
          // Cosmos chains return a code if there's an error
          if ("code" in data! && Boolean(data.code)) {
            const errData = data as { code: number; message?: string };
            throw new LcdClientError({
              message: `A chain error has occurred. Code: ${errData.code}. Message: ${errData.message}`,
              data,
              response,
            });
          }

          if (
            "status_code" in data! &&
            (data as { status_code: number }).status_code >= 400
          ) {
            const errData = data as { status_code: number; message?: string };
            throw new LcdClientError({
              message: getLcdClientErrorMessage({
                message: errData.message,
              }),
              data,
              response,
            });
          }

          return data?.data as T;
        } else {
          throw new LcdClientError({
            message: getLcdClientErrorMessage({
              message: (data as { message: string }).message,
            }),
            data,
            response,
          });
        }
      } catch (e) {
        throw new LcdClientError({
          message: `JSON parse error: ${e as Error}`,
          data: {
            url,
          },
          response,
        });
      }
    });
  }

  async queryContractSmart<T, Q = unknown>(
    contractAddress: string,
    query: Q,
    options: ClientOptions = this.options,
  ): Promise<T> {
    const encodedMsg = Buffer.from(JSON.stringify(query)).toString("base64");
    return this.get<T>(
      `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${encodedMsg}`,
      options,
    );
  }
}
