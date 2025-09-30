import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Axios } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";

export const PasswordSettings = () => {
  const [error, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const handleUpdate = async (data: any) => {
    try {
      await Axios.patch("/update/password", data);
      navigate("/profile");
    } catch (err) {
      if (isAxiosError(err)) {
        const errRes = err.response?.data as AxiosError;
        setError(errRes.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Change Password
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
          <div className="relative">
            <input
              type={showPassword1 ? 'text' : 'password'}
              placeholder="Old Password"
              className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("oldPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword1((prev) => !prev)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              {showPassword1 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
          <div className="relative">
            <input
              type={showPassword2 ? 'text' : 'password'}
              placeholder="New Password"
              className="w-full p-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword2((prev) => !prev)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              {showPassword2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
            Update Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};
