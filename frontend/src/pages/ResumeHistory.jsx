import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MatchResultCard from "../components/MatchResultCard";

export default function ResumeHistory() {
  const { token } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all resumes + their matches
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
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📁 Your Resume History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume._id} className="mb-10">
            <h3 className="text-xl font-semibold mb-2">
              📄 {resume.title || "Untitled Resume"}
            </h3>

            {resume.matches.length === 0 ? (
              <p className="text-gray-500 mb-6">No job matches for this resume yet.</p>
            ) : (
              resume.matches.map((match) => {
                const report = typeof match.matchReport === "string"
                  ? JSON.parse(match.matchReport)
                  : match.matchReport;

                return (
                  <MatchResultCard
                    key={match._id}
                    matchData={{
                      ...report,
                      resumeTitle: resume.title,
                    }}
                  />
                );
              })
            )}
          </div>
        ))
      )}
    </div>
  );
}
