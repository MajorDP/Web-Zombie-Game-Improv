import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../services/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSetEmail = (e) => {
    const value = e.target.value;

    setEmail(value);
  };

  const handleSetPassword = (e) => {
    const value = e.target.value;

    setPassword(value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await handleLogin({ email, password });

      if (data.error) {
        setError(data.error);
        setEmail("");
        setPassword("");
        return;
      }
      navigate("/game");
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = !email || !password;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Link
        to="/"
        className="text-5xl font-extrabold text-green-400 drop-shadow-md mb-6"
      >
        Zombie Shooter
      </Link>
      <h1 className="text-2xl font-extrabold text-green-400 drop-shadow-md mb-6">
        Sign in
      </h1>
      <form
        onSubmit={handleSignIn}
        className="space-y-4 flex flex-col items-center justify-center p-4 rounded-lg"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleSetEmail}
          className="p-2 rounded-md border focus:outline-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
          className="p-2 rounded-md border focus:outline-green-400"
        />
        {error && <p className="text-red-300">{error}</p>}
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-green-500 disabled:bg-gray-500 p-2 rounded-lg enabled:cursor-pointer duration-300"
        >
          Login
        </button>
      </form>
      <Link to="/register" className="font-light text-gray-300">
        Don't have an account?
      </Link>
    </div>
  );
};

export default LoginPage;
