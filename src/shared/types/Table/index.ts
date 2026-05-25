import { type ButtonVariants } from "@shared/ui/button";

export type TableColumn = {
  key: string;
  name: string;
  format?: any;
  tag?: (value: any) => { label: string; severity: string };
};

export type PropsTableAction = {
  label: string;
  action: string;
  variant?: ButtonVariants["variant"];
  visible?: (row: any) => boolean;
};
