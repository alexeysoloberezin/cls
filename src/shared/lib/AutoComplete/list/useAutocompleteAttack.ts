import { computed } from "vue";
import { ApiRoutesMap } from "@shared/api/types/ApiTypes";
import { useAutocomplete } from "../useAutocomplete";

export const useAutocompleteAttack = () => {
  const { cache } = useAutocomplete({
    key: `${ApiRoutesMap.attack}-data`,
    dataKey: "attack",
  });

  const attackList = computed(() => {
    if (!cache.value) return [];
    return cache.value.attack;
  });

  const domainList = computed(() => {
    if (!attackList.value) return [];
    return [...new Set(attackList.value.map((item: any) => item.domain))];
  });

  return { attackList, domainList };
};
