import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import CompareResumes from "./pages/CompareResumes";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/resumes" element={<ResumeHistory />} />
          <Route path="/upload-resume" element={<ResumeUploadPage />} />
           <Route path="/compare-resume" element={<CompareResumes />} />


        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
