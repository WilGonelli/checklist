import React from "react";
import styles from "./styleDropbox.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { Forklift } from "../../models/Forklift";

type DropboxProps = {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forklifts: Forklift[] | null;
};

export default function ForkliftSelect({
  selected,
  setSelected,
  open,
  setOpen,
  forklifts,
}: DropboxProps) {
  const handleSelect = (forklift: string) => {
    setSelected(forklift);
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => setOpen(!open)} className={styles.containerInput}>
        <p>{selected || "Selecione uma forklift..."}</p>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {open && forklifts && (
        <ul className={styles.containerList}>
          {forklifts.map((forklift) => (
            <li
              key={forklift.id}
              onClick={() => handleSelect(forklift.forklift_name)}
              className={styles.list}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {forklift.forklift_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
