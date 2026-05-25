import api from "@shared/api/utils/fetcher";
import type { ActionHandlerProps } from "./useTableActions";
import { saveAs } from "file-saver";
import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import { useQueryClient } from "@tanstack/vue-query";
import { ApiRoutesMap } from "@shared/api/types/ApiTypes";
const apiUrl = import.meta.env.VITE_BACKEND_URL

export function useGetActions() {
  const queryClient = useQueryClient();

  const handleDownloadScanvFile = async ({ row }: ActionHandlerProps) => {
    if (!row.link || typeof row.link !== "string") {
      console.warn("Нет ссылки или не строка");
      return;
    }
    
    const cleanedSrc = row.link?.replace(/^\/api\/v1/, '')
    const src = `${apiUrl}${cleanedSrc}`

    try {
      const res = await fetch(src);
      const blob = await res.blob();
      saveAs(blob, src);
    } catch (err: any) {
      console.error("Не удалось скачать файл", err);
      toast.error("Не удалось скачать файл", {
        description: err?.message || "Неизвестная ошибка",
        duration: 5000,
      });
    }
  };

  const startAttackMutation = useMutation({
    mutationKey: ["start-attack"],
    mutationFn: (id: string) => api.post(`/attack/start`, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutesMap.attack}-data`],
      });
      toast.success("Атака начата");
    },
    onError: (error) => {
      console.error("Не удалось начать атаку", error);
      toast.error("Не удалось начать атаку", {
        description: error?.message || "Неизвестная ошибка",
        duration: 5000,
      });
    },
  });
  const startAttack = async ({ row }: ActionHandlerProps) => {
    const { id } = row;
    if (!id || typeof id !== "string") {
      console.warn("Нет id");
      return;
    }
    startAttackMutation.mutate(id);
  };

  return {
    handleDownloadScanvFile,
    startAttack,
  };
}
