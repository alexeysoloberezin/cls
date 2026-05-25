import { type ActionHandlerProps } from "./TableActions/useTableActions";
import api from "@shared/api/utils/fetcher";
import { type PropsTableAction } from "@shared/types/Table";
import { useMutation } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";

type AnyObject = Record<string, unknown>;

type StartAnalyzerPayload = {
  attack_id: string;
  file_content: string;
  task_id: string;
  task_nodes: string ;
  task_type: "analyze_response";
};

export function useAiAnalyzer() {
  const action: PropsTableAction = {
    label: "Запустить Ai-Анализ",
    action: "start-ai-analyzer",
    variant: "outline",
  };

  const route = useRoute();
  const attackId = route.params.attackId;

  const mutation = useMutation({
    mutationFn: (data: StartAnalyzerPayload) =>
      api.post(`/aitask/create`, data),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [`${ApiRoutesMap.certvuln}-data`] })
    },
    onError: (error) => {
      console.error("Не удалось начать ai-анализ", error);
      toast.error("Не удалось начать ai-анализ", {
        description: error?.message || "Неизвестная ошибка",
        duration: 5000,
      }); 
    },
  });
  async function handleStartAnalyzer({
    row,
    tableType,
  }: ActionHandlerProps): Promise<void> {
    const filteredEntries = Object.entries(row).filter(([key, value]) => {
      if (key === "id" || key === "ai") return false;
      if (value === "" || value === null || value === undefined) return false;
      return true;
    });

    const cleaned: AnyObject = Object.fromEntries(filteredEntries);
    const json = JSON.stringify(cleaned);

    try {
      if (!row?.id) {
        toast.error("Не удалось начать атаку", {
          description: "Неизвестная ошибка",
          duration: 5000,
        });
        return;
      }
      mutation.mutate({
        attack_id: attackId as string,
        file_content: json,
        task_id: row.id as string,
        task_nodes: tableType,
        task_type: "analyze_response",
      });

      toast.success("AI-анализ успешно запущен", {
        description: `Задача: ${row.id}`,
        duration: 4000,
      });
    } catch (err: any) {
      toast.error("Ошибка запуска AI-анализа", {
        description: err?.message || "Неизвестная ошибка",
        duration: 5000,
      });
      console.error("AI-анализ ошибка:", err);
    }
  }

  return {
    action,
    handleStartAnalyzer,
  };
}
