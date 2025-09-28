import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // icons 
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IResponse, NewUser } from "../../types";
import { Axios } from "../../lib/api";
import { isAxiosError } from "axios";

export const Signup = () => {
  const { register, reset, handleSubmit, formState: { errors, isValid } } = useForm<NewUser>({
    mode: "onChange"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup: SubmitHandler<NewUser> = (data) => {
    Axios
    .post('/signup', data)
    .then(() => {
      reset();
      setShowPassword(false);
      navigate('/login');
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        const errRes = err.response?.data as IResponse;
        setError(errRes.message);
      }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-700"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
          <input
            type="text"
            placeholder="Name"
            className={`w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
              ${errors.name ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            {...register("name", { required: "Fill the name" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="text"
            placeholder="Surname"
            className={`w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
              ${errors.surname ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            {...register("surname", { required: "Fill the surname" })}
          />
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}

          <input
            type="text"
            placeholder="Login"
            className={`w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
              ${errors.login || error ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            {...register("login", { 
              required: "Fill the login",
              minLength: { value: 3, message: "Login must be at least 3 characters" }
            })}
          />
          {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
      
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                ${errors.password ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              {...register("password", { 
                required: "Fill the password",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={!isValid} 
            className={`w-full py-3 transition font-semibold rounded-xl shadow-md text-white ${
              isValid 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-500 cursor-not-allowed opacity-70"
            }`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};
