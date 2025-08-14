// src/components/MatchResultCard.js
import React from "react";

export default function MatchResultCard({ matchData }) {
  const { matchScore, summary, missingSkills, suggestions } = matchData;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Match Summary</h2>

      {/* Match Score */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">Match Score:</label>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-green-600 h-4 rounded-full transition-all"
            style={{ width: `${matchScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{matchScore}/100</p>
      </div>

      {/* Fit Summary */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">📝 Summary:</label>
        <p className="text-gray-800 mt-1">{summary}</p>
      </div>

      {/* Missing Keywords */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">🚫 Missing Keywords:</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {missingSkills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <label className="text-gray-700 font-medium">💡 Suggestions:</label>
        <ul className="list-disc list-inside mt-2 text-gray-800">
          {suggestions?.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
