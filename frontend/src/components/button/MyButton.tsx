import styles from "./styleMyButton.module.css";
import type { IgenericButton } from "../../models/Button";

export default function GenericButton({
  children,
  variant,
  alignText,
  handleClick,
  disabled,
}: IgenericButton) {
  const btnVariants: { [key in IgenericButton["variant"]]: string } = {
    fullColor: styles.btnFullColor,
    fullLight: styles.btnFullLightColor,
    fullUncolor: styles.btnFullUncolor,
    autoColor: styles.btnAutoColor,
    autoLight: styles.btnAutoLightColor,
  };

  const btnAlignment: { [key in IgenericButton["alignText"]]: string } = {
    center: styles.btnAlignTextCenterz,
    left: styles.btnAlignTextStart,
  };

  const alignmentBtn = btnAlignment[alignText];
  const variantBtn = btnVariants[variant];

  return (
    <>
      <button
        className={`${alignmentBtn} ${variantBtn} ${styles.defaultStyle}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
