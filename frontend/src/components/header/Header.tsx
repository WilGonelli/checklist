import { useNavigate } from "react-router-dom";
import type { User } from "../../models/User";
import styles from "./styleHeader.module.css";
import { MdOutlineLogout } from "react-icons/md";

type HeaderProps = {
  renderPage: string;
  user: User | null;
};

export default function Header({ renderPage, user }: HeaderProps) {
  const [name, last_name] = user ? user.name.split(" ") : ["u", "n"];
  const role = {
    superadmin: "Super Administrator",
    admin: "Administrator",
    user: "User",
  };
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.containerRouting}>
        <p></p>
        <p className={styles.titleRouting}>{renderPage}</p>
      </div>
      <div className={styles.contanerUser}>
        <div className={styles.iconUser}>
          <p>
            {name[0].toUpperCase()}
            {last_name[0].toUpperCase()}
          </p>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.name}</p>
          <p className={styles.userRole}>
            {user?.role ? role[user.role] : role["user"]}
          </p>
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <MdOutlineLogout size={36} color="gray" />
        </div>
      </div>
    </div>
  );
}
