import { useState } from "react";
import axios from "axios";

const CheckATSScore = () => {
  const [scoreData, setScoreData] = useState(null);

  const checkScore = async () => {
    const res = await axios.post("/api/resume/check-ats-score", {
      resumeText: "Your extracted resume text here",
      jobDescription: "Target job description here"
    });
    setScoreData(res.data);
  };

  return (
    <div>
      <button onClick={checkScore} className="bg-blue-500 text-white p-2 rounded">
        Check ATS Score
      </button>

      {scoreData && (
        <div>
          <h2>ATS Score: {scoreData.score}/100</h2>
          <p>Missing Keywords: {scoreData.missingKeywords.join(", ")}</p>
          <ul>
            {scoreData.suggestions.map((s, i) => (
              <li key={i}>💡 {s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckATSScore;
