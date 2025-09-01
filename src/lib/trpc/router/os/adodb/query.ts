import type { CacheEntry } from "@epic-web/cachified";
import { cachified } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { LcdClient } from "@/lib/andrjs/lcd-client";
import { RpcClient } from "@/lib/andrjs/rpc-client";
import { ADODB } from "@/lib/andrjs/ados/adodb";

const cache = new LRUCache<string, CacheEntry>({
  max: 5,
});

export async function queryAdodbCodeId(
  client: RpcClient | LcdClient,
  adodbAddress: string,
  ado: string,
) {
  return cachified({
    key: ["query", "adodb", adodbAddress, "code-id", ado].join("-"),
    cache,
    ttl: 1000 * 60 * 5, // 5 minutes
    getFreshValue: async () => {
      const codeId = await client.queryContractSmart<ADODB.GetCodeIdResponse>(
        adodbAddress,
        ADODB.getCodeId({ key: ado }),
      );
      return codeId;
    },
  });
}
