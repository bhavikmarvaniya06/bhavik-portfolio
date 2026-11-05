
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);

  const token = sessionStorage.getItem("adminToken");

  const fetchContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to load messages.");
      }

      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchContacts();
  }, []);

  const totalMessages = contacts.length;
  const unreadMessages = contacts.filter((c) => !c.isRead).length;
  const readMessages = totalMessages - unreadMessages;

  const readPercentage = totalMessages
    ? Math.round((readMessages / totalMessages) * 100)
    : 0;

  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    const count = contacts.filter((contact) => {
      if (!contact.createdAt) return false;
      const contactDate = new Date(contact.createdAt);
      contactDate.setHours(0, 0, 0, 0);
      return contactDate.getTime() === date.getTime();
    }).length;

    return {
      label: date.toLocaleDateString("en-IN", { weekday: "short" }),
      count,
    };
  });

  const maxDailyMessages = Math.max(
    1,
    ...lastSevenDays.map((day) => day.count)
  );

  const filteredContacts = contacts.filter((contact) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      contact.name?.toLowerCase().includes(searchText) ||
      contact.email?.toLowerCase().includes(searchText) ||
      contact.subject?.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "all" ||
      (filter === "read" && contact.isRead) ||
      (filter === "unread" && !contact.isRead);

    return matchesSearch && matchesFilter;
  });

  // Export all contact messages as CSV
  const exportCSV = () => {
    if (contacts.length === 0) {
      alert("No contact messages available to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Subject",
      "Message",
      "Status",
      "Date",
    ];

    const escapeCSV = (value) => {
      let text = String(value ?? "");

      // Prevent spreadsheet formula injection
      if (/^[\s]*[=+\-@]/.test(text)) {
        text = "'" + text;
      }

      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.subject,
      contact.message,
      contact.isRead ? "Read" : "Unread",
      contact.createdAt
        ? new Date(contact.createdAt).toLocaleString("en-IN")
        : "",
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `bhavik-portfolio-contacts-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const updateReadStatus = async (id, isRead) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/contact/${id}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isRead }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update message.");
      }

      setContacts((previous) =>
        previous.map((contact) =>
          contact._id === id
            ? { ...contact, isRead: data.contact.isRead }
            : contact
        )
      );

      setSelectedContact((previous) =>
        previous && previous._id === id
          ? { ...previous, isRead: data.contact.isRead }
          : previous
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const openMessage = async (contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      await updateReadStatus(contact._id, true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/contact/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete message.");
      }

      setContacts((previous) =>
        previous.filter((contact) => contact._id !== id)
      );
      setSelectedContact(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Bhavik Admin</h2>

        <nav>
          <button className="active">Dashboard</button>
          <button onClick={() => navigate("/")}>View Portfolio</button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Monitor and manage your portfolio messages.</p>
          </div>

          <div className="admin-header-actions">
            <button className="export-button" onClick={exportCSV}>
              ↓ Export CSV
            </button>
            <button className="analytics-refresh" onClick={fetchContacts}>
              Refresh
            </button>
          </div>
        </header>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span>Total Messages</span>
            <h2>{totalMessages}</h2>
            <small>All received messages</small>
          </div>

          <div className="admin-stat-card">
            <span>Unread Messages</span>
            <h2>{unreadMessages}</h2>
            <small>Waiting to be read</small>
          </div>

          <div className="admin-stat-card">
            <span>Read Messages</span>
            <h2>{readMessages}</h2>
            <small>Already viewed</small>
          </div>
        </div>

        <section className="analytics-grid">
          <div className="analytics-card">
            <h2>Messages Overview</h2>
            <p className="analytics-subtitle">
              Messages received during the last 7 days
            </p>

            <div className="weekly-chart">
              {lastSevenDays.map((day, index) => (
                <div className="chart-column" key={index}>
                  <span className="chart-count">{day.count}</span>
                  <div className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(day.count / maxDailyMessages) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="chart-day">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h2>Message Status</h2>
            <p className="analytics-subtitle">
              Read and unread message distribution
            </p>

            <div className="status-progress">
              <div className="status-progress-label">
                <span>Read Messages</span>
                <strong>{readPercentage}%</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-read"
                  style={{ width: `${readPercentage}%` }}
                />
              </div>
            </div>

            <div className="status-progress">
              <div className="status-progress-label">
                <span>Unread Messages</span>
                <strong>{100 - readPercentage}%</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-unread"
                  style={{ width: `${100 - readPercentage}%` }}
                />
              </div>
            </div>

            <div className="analytics-total">
              Total: {totalMessages} messages
            </div>
          </div>
        </section>

        <section className="admin-messages">
          <div className="admin-messages-heading">
            <h2>Contact Messages</h2>
            <button onClick={fetchContacts}>Refresh</button>
          </div>

          <input
            className="admin-search"
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="message-filter-buttons">
            <button
              className={filter === "all" ? "selected" : ""}
              onClick={() => setFilter("all")}
            >
              All ({totalMessages})
            </button>

            <button
              className={filter === "unread" ? "selected" : ""}
              onClick={() => setFilter("unread")}
            >
              Unread ({unreadMessages})
            </button>

            <button
              className={filter === "read" ? "selected" : ""}
              onClick={() => setFilter("read")}
            >
              Read ({readMessages})
            </button>
          </div>

          {loading ? (
            <p className="admin-info">Loading messages...</p>
          ) : filteredContacts.length === 0 ? (
            <p className="admin-info">No contact messages found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td>
                        <span
                          className={
                            contact.isRead
                              ? "message-status read-status"
                              : "message-status unread-status"
                          }
                        >
                          {contact.isRead ? "Read" : "Unread"}
                        </span>
                      </td>
                      <td>
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="admin-actions">
                        <button
                          className="view-message-button"
                          onClick={() => openMessage(contact)}
                        >
                          View
                        </button>
                        <button
                          className="delete-message-button"
                          onClick={() => handleDelete(contact._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedContact && (
          <div
            className="message-modal-overlay"
            onClick={() => setSelectedContact(null)}
          >
            <div
              className="message-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="message-modal-header">
                <h2>Message Details</h2>
                <button onClick={() => setSelectedContact(null)}>✕</button>
              </div>

              <div className="message-detail">
                <strong>Name</strong>
                <p>{selectedContact.name}</p>

                <strong>Email</strong>
                <p>{selectedContact.email}</p>

                <strong>Subject</strong>
                <p>{selectedContact.subject}</p>

                <strong>Message</strong>
                <p className="full-message">{selectedContact.message}</p>

                <strong>Status</strong>
                <p>{selectedContact.isRead ? "Read" : "Unread"}</p>

                <strong>Date</strong>
                <p>
                  {selectedContact.createdAt
                    ? new Date(selectedContact.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              <div className="message-modal-actions">
                <button
                  className="toggle-read-button"
                  onClick={() =>
                    updateReadStatus(
                      selectedContact._id,
                      !selectedContact.isRead
                    )
                  }
                >
                  Mark as {selectedContact.isRead ? "Unread" : "Read"}
                </button>

                <button
                  className="delete-message-button"
                  onClick={() => handleDelete(selectedContact._id)}
                >
                  Delete
                </button>

                <button
                  className="close-modal-button"
                  onClick={() => setSelectedContact(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
