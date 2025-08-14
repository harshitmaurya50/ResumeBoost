// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import MatchResultCard from "./MatchResultCard";

// export default function ResumeUpload() {
//   const { user, token } = useContext(AuthContext);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [matchResult, setMatchResult] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setMessage("");
//     setMatchResult(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       return setMessage("Please select a resume file.");
//     }

//     const formData = new FormData();
//     formData.append("resume", file);
//     formData.append("title", file.name);
//     formData.append("userId", user?.id);

//     setUploading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/resume/upload", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//          console.log("✅ Upload success:", data);
//         setMessage("✅ Resume uploaded and analyzed successfully!");
//         const parsedReport =
//           typeof data.matchReport === "string"
//             ? JSON.parse(data.matchReport)
//             : data.matchReport;

//         setMatchResult({
//           ...parsedReport,
//           resumeTitle: data.title,
//         });
//       } else {
//         setMessage(data.msg || "❌ Upload failed.");
//       }
//     } catch (err) {
//       console.error("Upload Error:", err);
//       setMessage("❌ Something went wrong.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">📄 Upload Resume</h2>
//       <p className="text-gray-600 mb-4">Only PDF files are supported.</p>

//       <input
//         type="file"
//         accept=".pdf"
//         onChange={handleFileChange}
//         className="mb-4 w-full border rounded px-4 py-2"
//       />

//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-950 disabled:opacity-50"
//       >
//         {uploading ? "Uploading..." : "Upload and Analyze"}
//       </button>

//       {message && (
//         <p className="mt-4 text-center text-sm font-medium text-blue-700">
//           {message}
//         </p>
//       )}

//       {/* Show match result card if available */}
//       {matchResult && (
//         <div className="mt-6">
//           <MatchResultCard matchData={matchResult} />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MatchResultCard from "./MatchResultCard";

export default function ResumeUpload() {
  const { user, token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setMatchResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      return setMessage("❌ Please select a resume file.");
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("title", file.name);
    formData.append("userId", user?.id);

    setUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Upload success:", data);
        setMessage("✅ Resume uploaded and analyzed successfully!");

        // Safely parse match report
        const parsedReport =
          typeof data.matchReport === "string"
            ? JSON.parse(data.matchReport)
            : data.matchReport;

        setMatchResult({
          ...parsedReport,
          resumeTitle: data.title,
        });
      } else {
        console.error("❌ Upload failed:", data);
        setMessage(data.msg || "❌ Upload failed.");
      }
    } catch (err) {
      console.error("❌ Upload Error:", err);
      setMessage("❌ Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">📄 Upload Resume</h2>
      <p className="text-gray-600 mb-4">Only PDF files are supported.</p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 w-full border rounded px-4 py-2"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-950 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload and Analyze"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-blue-700">
          {message}
        </p>
      )}

      {/* Show Match Result Card if matchResult exists */}
      {matchResult && (
        <div className="mt-6">
          <MatchResultCard matchData={matchResult} />
        </div>
      )}
    </div>
  );
}
