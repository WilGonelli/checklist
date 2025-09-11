import type { ReactNode } from "react";

type ButtonVariants =
  | "fullColor"
  | "fullLight"
  | "fullUncolor"
  | "autoColor"
  | "autoLight";
type Alignment = "left" | "center";

export interface IgenericButton {
  variant: ButtonVariants;
  alignText: Alignment;
  children: ReactNode;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
