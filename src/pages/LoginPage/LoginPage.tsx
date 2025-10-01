import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { AuthUser} from "../../types";
import { AxiosError, isAxiosError } from "axios";

export const Login = () => {
  const { register, handleSubmit, formState: { isValid }} = useForm<AuthUser>({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthUser> = (data: AuthUser) => {
    Axios.post("/login", data)
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          const errRes = err.response?.data as AxiosError;
          setError(errRes.message);
        }
      });
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-700"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="text"
            {...register("login", { required: true })}
            placeholder="Login"
            className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="w-full p-3 pr-10 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 transition font-semibold rounded-xl shadow-md text-white 
               ${
                 isValid
                   ? "bg-blue-600 hover:bg-blue-700"
                   : "bg-gray-500 cursor-not-allowed opacity-70"
               }`}
          >
            Log In
          </button>
        </form>
        <p className="text-center text-slate-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
