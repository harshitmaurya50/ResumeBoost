import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MatchResultCard from "../components/MatchResultCard";

export default function CompareResumes() {
  const { user, token } = useContext(AuthContext);
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [selectedResumeIds, setSelectedResumeIds] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch uploaded resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resume/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };

    fetchResumes();
  }, [token]);

  const handleCheckboxToggle = (id) => {
    setSelectedResumeIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleCompare = async () => {
    if (!jobDescription.trim() || selectedResumeIds.length === 0) {
      alert("Please enter a job description and select at least one resume.");
      return;
    }

    setLoading(true);
    setComparisonResults([]);

    try {
      const res = await fetch("http://localhost:5000/api/resume/compare-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobDescription,
          resumeIds: selectedResumeIds,
        }),
      });

      const data = await res.json();
      setComparisonResults(data);
    } catch (err) {
      console.error("Comparison error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🟢 Compare Multiple Resumes</h1>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
        className="w-full border rounded p-3 mb-4"
        placeholder="Paste the job description here..."
      />

      <h2 className="text-lg font-semibold mb-2">📄 Select resumes to compare:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {resumes.map((resume) => (
          <label
            key={resume._id}
            className="border rounded px-4 py-2 flex items-center gap-2 bg-white shadow-sm"
          >
            <input
              type="checkbox"
              value={resume._id}
              checked={selectedResumeIds.includes(resume._id)}
              onChange={() => handleCheckboxToggle(resume._id)}
            />
            {resume.title}
          </label>
        ))}
      </div>

      <button
        onClick={handleCompare}
        disabled={loading}
        className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-950 disabled:opacity-50"
      >
        {loading ? "Comparing..." : "Compare Selected Resumes"}
      </button>

      {comparisonResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">📊 Comparison Results</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparisonResults.map((result) => (
              <MatchResultCard
                key={result.resumeId}
                matchData={{
                  ...result.matchReport,
                  resumeTitle: result.resumeTitle,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
