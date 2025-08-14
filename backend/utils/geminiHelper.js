const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GEMINI Flash model
const modelId = "models/gemini-2.5-flash";

// Resume Analyzer
const analyzeResumeWithGeminiFlash = async (resumeText) => {
  const model = genAI.getGenerativeModel({ model: modelId });

//   const prompt = `
// You are an expert resume reviewer.


// Analyze the following resume and provide:

// 1. **Summary**: Brief overview of the candidate.
// 2. **Suggestions**: Top 3 personalized improvements.
// 3. **Missing Skills**: For a Software Engineer at Google.
// 4. **ATS Friendly?**: Yes/No and why.
// 5. **Tone & Language**: Any improvements needed.

// Resume:
// """
// ${resumeText}
// """
// `;
const prompt = `
You are an AI resume analyzer. Respond ONLY in valid JSON. Do NOT include markdown (\`\`\`json) blocks or explanation.
Format:
{
  "matchScore": 0-100,
  "summary": "string",
  "missingSkills": ["string", ...],
  "suggestions": ["string", ...]
}

Analyze this resume:
${resumeText}
`;

    let text = "";
   try {
    
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
    console.log("🔍 Raw Gemini response:\n", text);
    
    // const jsonStart = text.indexOf("{");
    // const json = text.slice(jsonStart);
     const match = text.match(/{[\s\S]*}/);
    if (!match) throw new Error("No valid JSON object found in response.");

    const cleaned = match[0];
    const parsed = JSON.parse(cleaned);
    console.log("✅ Parsed Gemini JSON:", parsed);
    return parsed;
  } catch (err) {
    console.error("❌ Failed to parse Gemini response:", text);
    return {
      matchScore: 0,
      summary: "AI response was unreadable.",
      missingSkills: [],
      suggestions: [],
    };
  }


  // const response = await result.response;
  // return response.text();
};

// Resume-to-Job Match
const matchResumeToJob = async (resumeText, jobDescription) => {
  const model = genAI.getGenerativeModel({ model: modelId });

  const prompt = `
You are an expert AI resume matcher.

Compare the candidate's resume to the job description and output a JSON object in this **strict format**:

{
  "matchScore": <number from 0 to 100>,
  "summary": "<1-2 line summary of fit>",
  "missingSkills": ["<skill1>", "<skill2>", "..."],
  "suggestions": ["<tip1>", "<tip2>", "..."]
}

Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""
Respond ONLY with the JSON.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse Gemini JSON
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}") + 1;
  const jsonText = text.slice(jsonStart, jsonEnd);

   try {
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (err) {
    console.error("JSON parse error:", err.message);
    throw new Error("Failed to parse Gemini JSON");
  }

};

const compareResumeWithJD = async (resumeText, jobDescription) => {
  const model = genAI.getGenerativeModel({ model: modelId });

  const prompt = `
Compare the following resume with this job description:

Job Description:
${jobDescription}

Resume:
${resumeText}

Respond ONLY in JSON format:
{
  "matchScore": 0-100,
  "summary": "...",
  "missingSkills": [...],
  "suggestions": [...]
}
`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  const match = text.match(/{[\s\S]*}/);
  const parsed = JSON.parse(match[0]);

  return parsed;
};


module.exports = {
  analyzeResumeWithGeminiFlash,
  matchResumeToJob,
  compareResumeWithJD
};
