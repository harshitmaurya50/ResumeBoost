// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ResumeBoost
        </Link>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
