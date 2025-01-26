import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/authRoutes/authRoutesApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      await registerUser(data).unwrap();
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      setMessage("Registration Failed");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleLogin}
          className=""
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none p-5"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Register
          </button>

          <p className="my-5 italic text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-red-500">
              Login{" "}
            </Link>
            here.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;