import { computed } from "vue";
import { useQueryClient } from "@tanstack/vue-query";

export const useAutocomplete = ({
  key,
  dataKey,
}: {
  key: string;
  dataKey?: string;
}) => {
  const queryClient = useQueryClient();

  const cache = computed(() => {
    const fullKey = queryClient
      .getQueryCache()
      .findAll()
      .find((q) => q.queryKey[0] === key)?.queryKey;

    if (!fullKey) return [];

    const dataCache: any = queryClient.getQueryData(fullKey);

    if (!dataCache) return [];

    if (dataKey) {
      return dataCache?.[dataKey];
    }
    return dataCache;
  });

  return { cache };
};
