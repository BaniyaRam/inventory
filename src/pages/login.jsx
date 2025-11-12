import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const mockData = [
    { email: "samir@example.com", password: "12345", role: "user" },
    { email: "admin@example.com", password: "12345", role: "admin" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = mockData.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user);
      toast.success("Login successful");
      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/home");
      }, 800);
    } else {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md p-8 bg-blue-100 shadow-lg rounded-2xl">
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto border shadow-md bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-2xl border-border/30"></div>
          <h2 className="text-2xl font-bold tracking-tight font-heading text-card-foreground">
            Login Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 text-base transition-all duration-300 border rounded-lg bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 text-base transition-all duration-300 border rounded-lg bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition-all duration-200 border rounded text-primary bg-input border-border focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-sm text-foreground">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-accent hover:text-accent/80 underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.97] shadow-md hover:shadow-lg rounded-lg"
          >
            {loading ? "Logging in..." : "Login to Your Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
