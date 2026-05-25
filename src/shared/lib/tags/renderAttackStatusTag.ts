import { AttackStatus } from "@shared/api/types/attack/attackTypes";
import { AlertTriangle, CheckCircle, HelpCircle, Pause } from "lucide-vue-next";
import { Loader } from "lucide-vue-next";
import type { Component } from "vue";

export const renderStatusTag = (
  value: string
): { label: string; severity: string; icon?: Component, iconClass?: string } => {
  switch (value) {
    case AttackStatus.Exec:
      return { label: "Выполняется", severity: "info", icon: Loader, iconClass: 'rotate-360' };
    case AttackStatus.Stop:
      return { label: "Остановлено", severity: "warn", icon: Pause, iconClass: '' };
    case AttackStatus.Error:
      return { label: "Ошибка", severity: "danger", icon: AlertTriangle, iconClass: '' };
    case AttackStatus.Finish:
      return { label: "Завершено", severity: "success", icon: CheckCircle, iconClass: '' };
    case AttackStatus.Ready:
      return {
        label: "Готово к запуску",
        severity: "secondary",
        icon: HelpCircle,
        iconClass: ''
      };
    default:
      return { label: value, severity: "secondary", icon: HelpCircle, iconClass: '' };
  }
};
