  import React, { useContext, useEffect, useState } from "react";
  import { AppContext } from "../context/AppContext";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";

  const Login = () => {
    const { token, setToken } = useContext(AppContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const navigate = useNavigate();

    const [state, setState] = useState("Sign Up");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
        const { data } = await axios.post(`${backendUrl}${endpoint}`, formData);

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message || "Success!");
        } else {
          toast.error(data.message || "An error occurred.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred.");
      }
    };

    useEffect(()=> {
      if (token) {
        navigate("/");
      }
    },[token])

    return (
      <form onSubmit={onSubmitHandler} className='min-h-[8vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
          <p>Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment.</p>

          {state === "Sign Up" && (
            <div className='w-full'>
              <p>Full Name</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type='text'
                name='name'
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
          )}

          <div className='w-full'>
            <p>Email</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='email'
              name='email'
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='password'
              name='password'
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <button type='submit' className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <p>
            {state === "Sign Up" ? "Already have an account?" : "Create a new account?"} {" "}
            <span onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")} className='text-[#5f6FFF] underline cursor-pointer'>
              {state === "Sign Up" ? "Login here" : "Click here"}
            </span>
          </p>
        </div>
      </form>
    );
  };

  export default Login;