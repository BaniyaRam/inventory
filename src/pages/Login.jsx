import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { AuthContext } from "../Context/AuthContext";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must be alphanumeric (no spaces or symbols)",
    }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const mockUsers = [
    { username: "Ram", password: "12345", role: "user" },
    { username: "admin", password: "12345", role: "admin" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const msg = result.error.errors.map((err) => err.message).join("\n");
      toast.error(msg);
      return;
    }

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Login Successful");
    login(user); 

    setTimeout(() => {
      navigate(user.role === "admin" ? "/admin" : "/home");
    }, 800);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate(storedUser.role === "admin" ? "/admin" : "/home");
    }
  }, [navigate]);

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
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-center text-gray-300">
            Password
          </label>
          <input
            className="block w-full px-4 py-2 mx-auto text-black bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="block w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
