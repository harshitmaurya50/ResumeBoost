import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.user, data.token);
      navigate("/dashboard");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div> 
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
         <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                            Sign up
                        </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
               <div className="mb-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800">name </label>
                   <input className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="name" placeholder="Name" onChange={handleChange}              required />
                    </div>

                <div className="mb-2">
                  <label  htmlFor="password"  className="block text-sm font-semibold text-gray-800">Email  </label>
                  <input className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="email" placeholder="Email" onChange=            {handleChange} required />
                  </div>

                <div className="mb-2">
                   <label  htmlFor="password"  className="block text-sm font-semibold text-gray-800">Password  </label>
                   <input  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="password" type="password" placeholder="Password"               onChange={handleChange} required />
                  </div>
               <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit">Register</button>
           </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
                            
               Already have an account?{" "}
                <span  className="font-medium text-purple-600 hover:underline"  >
                     <Link to="/login">Login</Link>
                </span>
           </p>
     </div>
    </div>
  </div>
  );
};

export default Register;
