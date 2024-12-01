import React, { useState } from 'react';
import MessagePopup from './MessagePopup';

const Applications = ({ onFileUpload, uploadedFiles }) => {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', status: 'Pending', mentoringEnded: false },
    { id: 2, name: 'Jane Smith', status: 'Pending', mentoringEnded: false },
  ]);

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Approved' } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: 'Rejected' } : app
      )
    );
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(id, file.name);
    }
  };

  const handleFileSubmit = (id) => {
    if (uploadedFiles[id]) {
      alert(
        `File "${uploadedFiles[id]}" for application ${id} has been submitted successfully!`
      );
    } else {
      alert('Please upload a file before submitting.');
    }
  };

  const handleMentoringEnd = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, mentoringEnded: true } : app
      )
    );
  };

  return (
    <div>
      <h3>Applications</h3>
      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <p>
            <strong>{app.name}</strong>
          </p>
          <p>Status: {app.status}</p>
          {app.status === 'Pending' && (
            <div>
              <button
                onClick={() => handleApprove(app.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  marginRight: '10px',
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(app.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                }}
              >
                Reject
              </button>
            </div>
          )}
          {app.status === 'Approved' && (
            <div>
              <button
                onClick={() => MessagePopup(app.name)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  marginRight: '10px',
                }}
              >
                Message
              </button>
              {!app.mentoringEnded && (
                <button
                  onClick={() => handleMentoringEnd(app.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'orange',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  End Mentoring
                </button>
              )}
              {app.mentoringEnded && (
                <div>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(app.id, e)}
                    style={{
                      marginTop: '10px',
                      padding: '5px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                    }}
                  />
                  <button
                    onClick={() => handleFileSubmit(app.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: 'green',
                      color: 'white',
                      border: 'none',
                      marginTop: '10px',
                    }}
                  >
                    Upload
                  </button>
                  {uploadedFiles[app.id] && (
                    <p>Uploaded File: {uploadedFiles[app.id]}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
