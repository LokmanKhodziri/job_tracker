import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

interface Application {
  id: number;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';
  notes: string | null;
}

interface AddApplicationModalProps {
  onClose: () => void;
  onAdd: (newApplication: Application) => void;
}

const AddApplicationModal: React.FC<AddApplicationModalProps> = ({
  onClose,
  onAdd,
}) => {
  const { auth } = useAuth();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<Application['status']>("APPLIED");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/applications",
        { company, position, status, notes },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      onAdd(response.data);
      onClose();
    } catch {
      alert("Failed to add application.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Application</h2>
        <form onSubmit={handleSubmit}>
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
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Application['status'])}
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="e.g., Spoke with HR manager"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Add Application</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;
