
import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CheckATSScore from '../components/CheckATSScore';
import img3 from '../assets/img3.png';
import img1 from '../assets/img1.png';




export default function Dashboard() {
   const navigate = useNavigate();
     const [name, setName] = useState('');
  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
const { user, token } = useContext(AuthContext);

useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.name) {
        setName(parsedUser.name);
      }

    }
  }, []);


const handleUpload = async () => {
  if (!file || !user || !token) return alert("Please upload a file");

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("userId", user.id);
  formData.append("title", file.name);

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
      alert("Resume analyzed successfully!");
      console.log("Resume Data:", data);
    } else {
      alert(data.msg);
    }
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Something went wrong.");
  }
};

const handleLogout = () => {
  localStorage.removeItem('token'); // or sessionStorage
  navigate('/login'); // using React Router
};



  return (
    <div className="min-h-screen   bg-gray-50">
      {/* Mobile Top Bar */}
      {/* <div className="md:hidden  flex justify-between items-center p-4 bg-white
       shadow">
        <h1 className="text-xl font-bold">{name}</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <HiMenu className="text-2xl" />
        </button>
      </div> */}
     
       {/* Main Content */}
      <main className="  mt-4 md:mt-0">
       <nav className="w-full fixed top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
      
         <div className="text-lg font-semibold"> Welcome {name}</div>
          <div className="flex gap-6 text-sm text-gray-600">
            <button className=" cursor-pointer underline hover:underline">Dashboard</button>
            <button   onClick={handleLogout } className=" cursor-pointer hover:underline">Logout</button>
            <button onClick={() => navigate("/resumes")}  className=" cursor-pointer hover:underline">My Resume History</button>

          </div>
        
      </div>
    </nav>
      </main>

        {/* Upload Box */}
        <div  className='m-3'>
          <h1 className='text-lg mt-18 font-semibold'>Analyse Resume</h1>
        <div className='bg-slate-300 mt-4 flex justify-between items-center'> 
      

          <button 
           onClick={() => navigate("/upload-resume")}
          className=" bg-blue-900 cursor-pointer text-lg font-semibold ml-14 p-10 text-white py-2 rounded hover:bg-blue-950">
            Analyze Resume & Find Matches
          </button>

           
           
        {/* </div> */}
        <img src={img1} alt="image" className='w-120 h-80 mr-14' /> </div>
         <h1 className='text-lg  mt-5 font-semibold'>Compare Resume</h1>
        <div className='bg-slate-300 mt-4 flex justify-between items-center'> 
          
          <button onClick={() => navigate("/compare-resume")}    className=" bg-blue-900 text-lg font-semibold ml-14 p-10 cursor-pointer text-white py-2 rounded hover:bg-blue-950">Compare Resume</button>
          <img src={img3} alt="image" className='w-100 h-70 mr-14' /></div>
          </div>
       
      
      
    </div>
  );
}

