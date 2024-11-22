import React, { useState } from "react";

const initialMatches = [
  {
    id: 1,
    title: "React Beginner Course",
    description: "Learn React from scratch!",
    role: "Mentor",
    language: "JavaScript",
    teachingMethod: "Online",
    detailedDescription:
      "This is a course for complete beginners in React. We'll cover components, state, props, and hooks.",
    currentApplications: 1,
    maxApplications: 5,
  },
  {
    id: 2,
    title: "Advanced Python Workshop",
    description: "Deep dive into Python!",
    role: "Mentee",
    language: "Python",
    teachingMethod: "Offline",
    detailedDescription:
      "This workshop is for those who are already familiar with Python and want to learn advanced topics like multi-threading, async, and more.",
    currentApplications: 3,
    maxApplications: 5,
  },
  {
    id: 3,
    title: "Full-Stack Development Bootcamp",
    description: "Become a full-stack developer!",
    role: "Mentor",
    language: "JavaScript",
    teachingMethod: "Hybrid",
    detailedDescription:
      "This bootcamp covers both front-end and back-end technologies, including React, Node.js, and databases.",
    currentApplications: 2,
    maxApplications: 10,
  },
];

const MatchPage = () => {
  const [matches, setMatches] = useState(initialMatches);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
    language: "",
    teachingMethod: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editableMatch, setEditableMatch] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newMatch, setNewMatch] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    role: "",
    language: "",
    teachingMethod: "",
    currentApplications: 0,
    maxApplications: 1,
  });

  const handleApply = (match) => {
    if (match.currentApplications >= match.maxApplications) {
      alert("Applications are full!");
      return;
    }

    alert("You have applied successfully!");
    match.currentApplications++;
    setSelectedMatch({ ...match });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMatches = matches.filter((match) => {
    const matchesFilters =
      (filters.role === "" || match.role === filters.role) &&
      (filters.language === "" || match.language === filters.language) &&
      (filters.teachingMethod === "" || match.teachingMethod === filters.teachingMethod);

    const matchesSearch =
      searchQuery.trim() === "" ||
      match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilters && matchesSearch;
  });

  const handleEditMatch = () => {
    setEditableMatch({ ...selectedMatch });
    setEditMode(true);
  };

  const handleSaveMatch = () => {
    Object.assign(selectedMatch, editableMatch);
    setEditMode(false);
    alert("Match updated successfully!");
  };

  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableMatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMatch = () => {
    setIsCreating(true);
    setNewMatch({
      title: "",
      description: "",
      detailedDescription: "",
      role: "",
      language: "",
      teachingMethod: "",
      currentApplications: 0,
      maxApplications: 1,
    });
  };

  const handleSaveNewMatch = () => {
    const newId = matches.length + 1;
    setMatches((prev) => [...prev, { id: newId, ...newMatch }]);
    setIsCreating(false);
    alert("New match created successfully!");
  };

  const handleNewMatchChange = (e) => {
    const { name, value } = e.target;
    setNewMatch((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Match Page</h2>

      {!selectedMatch && !isCreating ? (
        <div>
          {/* 필터 섹션 */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <h4>Filters</h4>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                style={{ padding: "10px", flex: 1 }}
              >
                <option value="">All Roles</option>
                <option value="Mentor">Mentor</option>
                <option value="Mentee">Mentee</option>
              </select>
              <select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                style={{ padding: "10px", flex: 1 }}
              >
                <option value="">All Languages</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
              </select>
              <select
                name="teachingMethod"
                value={filters.teachingMethod}
                onChange={handleFilterChange}
                style={{ padding: "10px", flex: 1 }}
              >
                <option value="">All Methods</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* 검색 섹션 */}
            <div>
              <input
                type="text"
                placeholder="Search by title or description"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>

          {/* 글쓰기 버튼 */}
          <button
            onClick={handleCreateMatch}
            style={{
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Create New Match
          </button>

          {/* 매칭 목록 */}
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <h4>{match.title}</h4>
                <p>{match.description}</p>
                <p>
                  <strong>Role:</strong> {match.role}
                </p>
                <p>
                  <strong>Language:</strong> {match.language}
                </p>
                <p>
                  <strong>Teaching Method:</strong> {match.teachingMethod}
                </p>
              </div>
            ))
          ) : (
            <p>No matches found for the selected filters and search query.</p>
          )}
        </div>
      ) : isCreating ? (
        <div>
          <h3>Create New Match</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newMatch.title}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newMatch.description}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Detailed Description:
            <textarea
              name="detailedDescription"
              value={newMatch.detailedDescription}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              value={newMatch.role}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            >
              <option value="">Select Role</option>
              <option value="Mentor">Mentor</option>
              <option value="Mentee">Mentee</option>
            </select>
          </label>
          <label>
            Language:
            <select
              name="language"
              value={newMatch.language}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </label>
          <label>
            Teaching Method:
            <select
              name="teachingMethod"
              value={newMatch.teachingMethod}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            >
              <option value="">Select Method</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>
          <label>
            Max Applications:
            <input
              type="number"
              name="maxApplications"
              value={newMatch.maxApplications}
              onChange={handleNewMatchChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <button
            onClick={handleSaveNewMatch}
            style={{
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              marginRight: "10px",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setIsCreating(false)}
            style={{
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {/* 상세 보기 */}
          <button
            onClick={() => setSelectedMatch(null)}
            style={{
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              marginBottom: "10px",
            }}
          >
            Back
          </button>
          {editMode ? (
            <div>
              <h3>Edit Match</h3>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editableMatch.title}
                  onChange={handleEditableChange}
                  style={{ display: "block", marginBottom: "10px" }}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={editableMatch.description}
                  onChange={handleEditableChange}
                  style={{ display: "block", marginBottom: "10px" }}
                />
              </label>
              <label>
                Detailed Description:
                <textarea
                  name="detailedDescription"
                  value={editableMatch.detailedDescription}
                  onChange={handleEditableChange}
                  style={{ display: "block", marginBottom: "10px" }}
                />
              </label>
              <button
                onClick={handleSaveMatch}
                style={{
                  padding: "10px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3>{selectedMatch.title}</h3>
              <p>{selectedMatch.detailedDescription}</p>
              <p>
                <strong>Role:</strong> {selectedMatch.role}
              </p>
              <p>
                <strong>Language:</strong> {selectedMatch.language}
              </p>
              <p>
                <strong>Teaching Method:</strong> {selectedMatch.teachingMethod}
              </p>
              <p>
                <strong>Applications:</strong> {selectedMatch.currentApplications}/
                {selectedMatch.maxApplications}
              </p>
              <button
                onClick={() => handleApply(selectedMatch)}
                style={{
                  padding: "10px",
                  backgroundColor: "#61dafb",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                Apply
              </button>
              <button
                onClick={handleEditMatch}
                style={{
                  padding: "10px",
                  backgroundColor: "#ffc107",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchPage;