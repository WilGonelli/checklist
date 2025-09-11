import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../view/login/Login";
import Checklistview from "../view/checklist/ChecklistView";
import ChecklistHistory from "../view/checklist/ChecklistHistory";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checklist" element={<Checklistview />} />
        <Route path="/checklist/history/:id" element={<ChecklistHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
