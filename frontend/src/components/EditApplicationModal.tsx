import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

interface Application {
  id: number;
  company: string;
  position: string;
  status: "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";
  notes: string | null;
}

interface EditApplicationModalProps {
  application: Application;
  onClose: () => void;
  onUpdate: (updatedApplication: Application) => void;
  onDelete: (deletedApplicationId: number) => void;
}

const EditApplicationModal: React.FC<EditApplicationModalProps> = ({
  application,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const { auth } = useAuth();
  const [company, setCompany] = useState(application.company);
  const [position, setPosition] = useState(application.position);
  const [status, setStatus] = useState<Application["status"]>(
    application.status
  );
  const [notes, setNotes] = useState(application.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/applications/${application.id}`,
        { company, position, status, notes },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      alert("Failed to update application.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await api.delete(`/applications/${application.id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        onDelete(application.id);
        onClose();
      } catch (error) {
        alert("Failed to delete application.");
      }
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Edit Application</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              id='company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='position'>Position</label>
            <input
              type='text'
              id='position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              id='status'
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Application["status"])
              }
            >
              <option value='APPLIED'>Applied</option>
              <option value='INTERVIEWING'>Interviewing</option>
              <option value='OFFER'>Offer</option>
              <option value='REJECTED'>Rejected</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='notes'>Notes</label>
            <textarea
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className='modal-actions'>
            <button type='submit' className='btn-primary'>
              Save
            </button>
            <button type='button' className='btn-secondary' onClick={onClose}>
              Cancel
            </button>
            <button type='button' className='btn-danger' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;
