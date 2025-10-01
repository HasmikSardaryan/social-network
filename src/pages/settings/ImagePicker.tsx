import { motion } from "framer-motion";
import { Upload, User } from "lucide-react";

export const ImagePicker = () => {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Avatar Settings
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center shadow-lg border-2 border-slate-600">
            <User className="h-12 w-12 text-slate-400" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="avatarUpload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer shadow-md transition"
          >
            <Upload className="h-5 w-5" />
            Choose New Avatar
          </label>
          <input id="avatarUpload" type="file" className="hidden" />

          <button
            type="button"
            className="w-full py-3 mt-4 font-semibold rounded-xl shadow-md text-white bg-green-600 hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};
