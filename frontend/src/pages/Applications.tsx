import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function Applications() {
  const { auth } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setApplications(response.data);
      } catch {
        alert("Failed to fetch applications.");
      }
    };
    if (auth.token) {
      fetchApplications();
    }
  }, [auth.token]);

  const addApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/applications",
        { company, position, status, notes },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setApplications([...applications, response.data]);
      setCompany("");
      setPosition("");
      setStatus("APPLIED");
      setNotes("");
    } catch {
      alert("Failed to add application.");
    }
  };

  return (
    <div>
      <h2>Job Applications</h2>
      <form onSubmit={addApplication}>
        <input
          type='text'
          placeholder='Company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type='text'
          placeholder='Position'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <textarea
          placeholder='Notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type='submit'>Add Application</button>
      </form>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.company} - {app.position} - {app.status} - {app.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}