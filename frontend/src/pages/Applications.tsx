import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Applications({ token }: { token: string }) {
  const [applications, setApplications] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch {
        alert("Failed to fetch applications.");
      }
    };
    fetchApplications();
  }, [token]);

  const addApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/applications",
        { company, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications([...applications, response.data]);
      setCompany("");
      setPosition("");
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
        <button type='submit'>Add Application</button>
      </form>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.company} - {app.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
