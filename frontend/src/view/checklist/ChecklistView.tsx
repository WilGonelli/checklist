import Sidebar from "../../components/sidebar/Sidebar";
import { useChecklist } from "../../viewmodel/checklist/useChecklist";
import styles from "./styleChecklist.module.css";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";
import { Navigate, useNavigate } from "react-router-dom";
import ForkliftSelect from "../../components/dropbox/Dropbox";
import MyButton from "../../components/button/MyButton";

export default function ChecklistView() {
  const {
    user,
    loading,
    forklifts,
    checklistsStatus,
    selected,
    setSelected,
    open,
    setOpen,
  } = useChecklist();

  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (!user) return <Navigate to={"/"} replace />;

  return (
    <div className={styles.container}>
      <Sidebar tab="checklist" />
      <div className={styles.containerContent}>
        <Header renderPage="Checklist" user={user} />
        <div className={styles.containerChecklist}>
          <div className={styles.containerNewChecklist}>
            <p className={styles.newChecklistTitle}>Start new checklist</p>
            <p className={styles.labelSelect}>Select Forklift</p>
            <ForkliftSelect
              selected={selected}
              setSelected={setSelected}
              open={open}
              setOpen={setOpen}
              forklifts={forklifts}
            />
            <div className={styles.containerBtn}>
              <MyButton variant="fullColor" alignText="center">
                Start Checklist
              </MyButton>
            </div>
          </div>
          {checklistsStatus && (
            <div className={styles.containerRecents}>
              <p>Recent checklists</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>forklift name</th>
                    <th>user</th>
                    <th>Status</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistsStatus.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        navigate(`/checklist/history/${row.forklift_id}`);
                      }}
                    >
                      <td>{row.forklift_name}</td>
                      <td>{row.user_name}</td>
                      <td>{row.checklist_status}</td>
                      <td>{row.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
