import { LuTruck, LuClipboardList, LuUsers } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlineBarChart } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import styles from "./styleSidebar.module.css";
import MyButton from "../button/MyButton";

type SidebarProps = {
  tab: string;
};

export default function Sidebar({ tab }: SidebarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <LuTruck size={40} />
        <h1 className={styles.title}>Smart Forklift</h1>
      </div>
      <div className={styles.containerButtons}>
        <MyButton
          alignText="left"
          variant={tab === "dashboard" ? "fullColor" : "fullUncolor"}
          disabled={true}
        >
          <div className={styles.containerBtn}>
            <MdOutlineDashboard size={18} />
            <p>Dashboard</p>
          </div>
        </MyButton>
        <MyButton
          alignText="left"
          variant={tab === "checklist" ? "fullColor" : "fullUncolor"}
        >
          <div className={styles.containerBtn}>
            <LuClipboardList size={18} />
            <p>Checklist</p>
          </div>
        </MyButton>
        <MyButton
          alignText="left"
          variant={tab === "forklift" ? "fullColor" : "fullUncolor"}
          disabled={true}
        >
          <div className={styles.containerBtn}>
            <LuTruck size={18} />
            <p>Forklift </p>
          </div>
        </MyButton>
        <MyButton
          alignText="left"
          variant={tab === "shift" ? "fullColor" : "fullUncolor"}
          disabled={true}
        >
          <div className={styles.containerBtn}>
            <BsBuilding size={18} />
            <p>Shift </p>
          </div>
        </MyButton>
        <MyButton
          alignText="left"
          variant={tab === "user" ? "fullColor" : "fullUncolor"}
          disabled={true}
        >
          <div className={styles.containerBtn}>
            <LuUsers size={18} />
            <p>User Management</p>
          </div>
        </MyButton>
        <MyButton
          alignText="left"
          variant={tab === "reports" ? "fullColor" : "fullUncolor"}
          disabled={true}
        >
          <div className={styles.containerBtn}>
            <MdOutlineBarChart size={18} />
            <p>Reports</p>
          </div>
        </MyButton>
      </div>
    </div>
  );
}
