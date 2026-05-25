import { useAiAnalyzer } from "@shared/lib/useAIAnalyzer";
import type { PropsTableAction } from "@shared/types/Table";
import { computed } from "vue";
import { useGetActions } from "./tableActions";
import { useRouter } from "vue-router";

type RowData = Record<string, unknown>;

type TableType = "dc" | "cert" | "file" | "attack" | "group" | "scanv";

export type ActionHandlerProps = {
  row: RowData;
  tableType: TableType;
};

export type ActionHandler = (props: ActionHandlerProps) => void;

export function useTableActions({ tableType }: { tableType: TableType }) {
  const { action: actionAnalyzer, handleStartAnalyzer } = useAiAnalyzer();
  const { handleDownloadScanvFile, startAttack } = useGetActions();
  const { push } = useRouter();

  const actionHandlers: Record<string, ActionHandler> = {
    "start-ai-analyzer": ({ row, tableType }) =>
      handleStartAnalyzer({ row, tableType }),
    "download-scanv-file": ({ row, tableType }) =>
      handleDownloadScanvFile({ row, tableType }),
    "start-attack": ({ row, tableType }) => startAttack({ row, tableType }),
    "view-scanv-file": ({row}) => {
      push(`/htmlViewer?src=${row.link}`);
    },
    simulation: ({ row }) => {
      push(`/simulation/${row.id}`);
    },
  };

  const actionsData: Record<string, PropsTableAction[]> = {
    dc: [],
    cert: [actionAnalyzer],
    scanv: [
      {
        label: "Скачать файл",
        action: "download-scanv-file",
        variant: "outline",
      },
      {
        label: "Посмотреть файл",
        action: "view-scanv-file",
        variant: "outline",
      }
    ],
    file: [actionAnalyzer],
    group: [actionAnalyzer],
    attack: [
      {
        label: "Запустить",
        action: "start-attack",
        variant: "outline",
        visible: (row) => row.status === "ready",
      },
    ],
  };

  function dispatchAction(action: string, row: RowData) {
    const handler = actionHandlers[action];
    if (handler) {
      handler({ row, tableType });
    } else {
      console.warn(`No handler defined for action "${action}"`);
    }
  }

  function onActionClick({ action, row }: { action: string; row: any }) {
    dispatchAction(action, row);
  }

  const actions = computed(() => {
    const data = actionsData[tableType];
    return data || [];
  });

  return {
    actions,
    onActionClick,
  };
}
