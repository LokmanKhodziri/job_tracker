import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import "../styles/applications.css";
import "../styles/edit-application-modal.css";
import EditApplicationModal from "../components/EditApplicationModal";
import AddApplicationModal from "../components/AddApplicationModal";

// Define the type for an application
interface Application {
  id: number;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';
  notes: string | null;
}

type FilterStatus = Application['status'] | "ALL";

export default function Applications() {
  const { auth } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const params = filterStatus !== "ALL" ? { status: filterStatus } : {};
        const response = await api.get("/applications", {
          headers: { Authorization: `Bearer ${auth.token}` },
          params: params,
        });
        setApplications(response.data);
      } catch {
        alert("Failed to fetch applications.");
      }
    };
    if (auth.token) {
      fetchApplications();
    }
  }, [auth.token, filterStatus]);

  const handleAdd = (newApplication: Application) => {
    setApplications((prevApps) => [...prevApps, newApplication]);
  };

  const handleEdit = (app: Application) => {
    setEditingApplication(app);
  };

  const handleUpdate = (updatedApplication: Application) => {
    setApplications(
      applications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  const handleDelete = (deletedApplicationId: number) => {
    setApplications(applications.filter((app) => app.id !== deletedApplicationId));
  };

  const handleCloseEditModal = () => {
    setEditingApplication(null);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <h2>My Applications</h2>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            Add New Application
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`btn-filter ${filterStatus === "ALL" ? "active" : ""}`}
            onClick={() => setFilterStatus("ALL")}
          >
            All
          </button>
          <button
            className={`btn-filter ${filterStatus === "APPLIED" ? "active" : ""}`}
            onClick={() => setFilterStatus("APPLIED")}
          >
            Applied
          </button>
          <button
            className={`btn-filter ${filterStatus === "INTERVIEWING" ? "active" : ""}`}
            onClick={() => setFilterStatus("INTERVIEWING")}
          >
            Interviewing
          </button>
          <button
            className={`btn-filter ${filterStatus === "OFFER" ? "active" : ""}`}
            onClick={() => setFilterStatus("OFFER")}
          >
            Offer
          </button>
          <button
            className={`btn-filter ${filterStatus === "REJECTED" ? "active" : ""}`}
            onClick={() => setFilterStatus("REJECTED")}
          >
            Rejected
          </button>
        </div>

        <div className="applications-list-container">
          {applications.length > 0 ? (
            <ul className="applications-list">
              {applications.map((app) => (
                <li key={app.id} className="application-item">
                  <div>
                    <h3>{app.company}</h3>
                    <p>{app.position}</p>
                    {app.notes && <p><em>{app.notes}</em></p>}
                  </div>
                  <div className="application-actions">
                    <span className={`application-status status-${app.status}`}>
                      {app.status}
                    </span>
                    <button onClick={() => handleEdit(app)} className="btn-secondary">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't added any applications yet.</p>
          )}
        </div>
      </div>
      {editingApplication && (
        <EditApplicationModal
          application={editingApplication}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      {showAddModal && (
        <AddApplicationModal
          onClose={handleCloseAddModal}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}