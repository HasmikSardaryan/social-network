import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type { NewUser } from "../../types";

export const Signup = () => {
  const { register, reset, handleSubmit, formState: { errors, isValid } } = useForm<NewUser>({
    mode: "onChange"
  });

  const handleSignup: SubmitHandler<NewUser> = (data) => {
    console.log("Signup data:", data);
    reset();
  }

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
            placeholder="Username"
            className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('username', { required: 'Fill the username' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', { required: 'Fill the email' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pr-10 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', { 
                required: 'Fill the password',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            <button type="button" className="absolute right-3 top-3 text-slate-400 hover:text-white">
              <Eye className="h-5 w-5" />
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('confirmPassword', { 
              required: 'Confirm your password',
              validate: (value, formValues) => value === formValues.password || "Passwords don't match"
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          <button
            type="submit"
            disabled={!isValid} // <-- disabled if form is invalid
            className={`w-full py-3 transition font-semibold rounded-xl shadow-md text-white ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-800 cursor-not-allowed'
            }`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};
