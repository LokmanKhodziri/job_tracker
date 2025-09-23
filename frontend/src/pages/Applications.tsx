import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import "../styles/applications.css";

// Define the type for an application
interface Application {
  id: number;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';
  notes: string | null;
}

export default function Applications() {
  const { auth } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Application['status']>("APPLIED");
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
    <div className="applications-page">
      <div className="applications-container">
        <div className="add-application-form">
          <h2>Add New Application</h2>
          <form onSubmit={addApplication}>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                placeholder="e.g., Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                placeholder="e.g., Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Application['status'])}>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                placeholder="e.g., Spoke with HR manager"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Add Application</button>
          </form>
        </div>

        <div className="applications-list-container">
          <h2>My Applications</h2>
          {applications.length > 0 ? (
            <ul className="applications-list">
              {applications.map((app) => (
                <li key={app.id} className="application-item">
                  <div>
                    <h3>{app.company}</h3>
                    <p>{app.position}</p>
                    {app.notes && <p><em>{app.notes}</em></p>}
                  </div>
                  <span className={`application-status status-${app.status}`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't added any applications yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}