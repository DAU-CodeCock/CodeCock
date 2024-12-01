import React, { useState, useEffect } from 'react';
import Applications from './Applications';
import MentorTestPage from './MentorTestPage';

const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    displayName: 'Default User',
    email: 'defaultuser@example.com',
    role: 'mentee',
    bio: 'This is a default bio.',
  });
  const [editMode, setEditMode] = useState(false);
  const [isMentorApproved, setIsMentorApproved] = useState(false);

  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', status: 'Pending', mentoringEnded: false },
    { id: 2, name: 'Jane Smith', status: 'Pending', mentoringEnded: false },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState({});

  // 사용자 정보가 변경되면 formData를 업데이트
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || 'Default User',
        email: user.email || 'defaultuser@example.com',
        role: user.role || 'mentee',
        bio: user.bio || 'This is a default bio.',
      });
    }
  }, [user]);

  const handleTestCompletion = (passed) => {
    console.log('Test Completed:', passed);
    if (passed) {
      setIsMentorApproved(true);
      setFormData((prev) => ({ ...prev, role: 'mentor' }));
    } else {
      alert('Test failed. You cannot become a mentor at this time.');
    }
  };

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

  const handleMentoringEnd = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, mentoringEnded: true } : app
      )
    );
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [id]: file.name }));
    }
  };

  const handleFileSubmit = (id) => {
    if (uploadedFiles[id]) {
      alert(
        `Mentoring for ${applications.find((app) => app.id === id).name} has been completed with file "${uploadedFiles[id]}"!`
      );
    } else {
      alert('Please upload a file before submitting.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Profile</h2>

      {/* Profile Information */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        {editMode ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditMode(false);
            }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label style={{ marginBottom: '10px' }}>
              Display Name:
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    displayName: e.target.value,
                  }))
                }
                style={{
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </label>
            <label style={{ marginBottom: '10px' }}>
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                style={{
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </label>
            <label style={{ marginBottom: '20px' }}>
              Bio:
              <input
                type="text"
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                style={{
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100px',
                marginTop: '10px',
              }}
            >
              Save
            </button>
          </form>
        ) : (
          <>
            <p>
              <strong>Display Name:</strong> {formData.displayName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Bio:</strong> {formData.bio}
            </p>
            <button
              onClick={() => setEditMode(true)}
              style={{
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '150px',
                marginTop: '10px',
              }}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Mentor Test Page */}
      <MentorTestPage />

      {/* Applications */}
      <Applications
        applications={applications}
        onApprove={handleApprove}
        onReject={handleReject}
        onMentoringEnd={handleMentoringEnd}
        uploadedFiles={uploadedFiles}
        onFileUpload={handleFileUpload}
        onFileSubmit={handleFileSubmit}
      />
    </div>
  );
};

export default Profile;
