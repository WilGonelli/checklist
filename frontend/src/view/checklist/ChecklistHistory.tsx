import { useParams } from "react-router-dom";
import { useChecklist } from "../../viewmodel/checklist/useChecklist";

export default function ChecklistHistory() {
  const { id } = useParams(); // pega o id da URL
  const { loading } = useChecklist(Number(id));

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1></h1>
      <p>Status: {id} </p>
      <p>Modelo:</p>
    </div>
  );
}
