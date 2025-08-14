
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbaar';


const Home = () => {
   const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const handleClick = () => {
    if (user && token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
 
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Boost Your Resume with AI</h1>
        
        <div className="flex gap-4">
          <button
            onClick={handleClick}
            className="px-6 py-2 bg-gray-800 cursor-pointer text-white rounded hover:bg-gray-700"
          >
            Analyze Resume
          </button>
          <button
            onClick={handleClick}
            className="px-6 py-2 border border-gray-500 rounded cursor-pointer hover:bg-gray-100"
          >
            Start for Free
          </button>
        </div>
        <div className="flex gap-6 mt-10 opacity-60">
          <span>🪟 Microsoft</span>
          <span>🛒 Amazon</span>
          <span>🔍 Google</span>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Home

