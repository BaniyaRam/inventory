import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 character" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "username must be alhanumeric (np spaces or symbols",
    }),
  password: z.string().min(5, {
    message: "password must be at least 5 characters",
  }),
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const mockUser = {
    username: "Ram",
    password: "12345",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ username, password });
    setError("");
    setSuccess("");
    if (username === mockUser.username && password === mockUser.password) {
      toast.success("Login Successful");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(mockUser));

      navigate("/home");
    } else {
      toast.error("invalid credentials ");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="px-12 py-10 space-y-6 bg-gray-900 border border-gray-700 rounded shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-white">
          Login Form
        </h1>
        <div>
          <label className="block mb-1 font-semibold text-center text-gray-300">
            Username
          </label>
          <input
            className="block w-full px-4 py-2 mx-auto text-black bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mt-2 mb-2">
          <label className="block mb-1 font-semibold text-center text-gray-300">
            Password
          </label>
          <input
            className="block w-full px-4 py-2 mx-auto text-black bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button className="block w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
            Login
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            <span>Remember me?</span>
          </label>

          <button className="underline hover:text-blue-400">
            Forget Password?
          </button>
        </div>
      </form>
    </div>
  );
}
