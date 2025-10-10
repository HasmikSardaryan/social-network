import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, User, X, Check } from "lucide-react";
import { Axios } from "../../lib/api";
import type { IResponse } from "../../types";
import { useNavigate } from "react-router-dom";

export const ImagePicker = () => {
  const picInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);


  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (picInput.current) {
      picInput.current.click();
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const files = picInput.current?.files
    if (files) {
      const file = files[0];
      const form = new FormData()
      form.append('picture', file);

      Axios
      .patch<IResponse<string>>(('/profile/upload'), form)
      .then((res) => {
        console.log(res.data.payload);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        
      })
    }
  }

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
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
          Avatar Settings
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center shadow-lg border-2 border-slate-600 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Selected Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-slate-400" />
            )}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer shadow-md transition"
          >
            <Upload className="h-5 w-5" />
            Choose Avatar
          </button>
        </div>

        <input
          ref={picInput}
          type="file"
          className="hidden"
          onChange={handlePreview}
        />

        {preview && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleUpload}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
            >
              <Check className="h-5 w-5" />
              Save
            </button>

            <button
              type="button"
              onClick={() => setPreview('')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition"
            >
              <X className="h-5 w-5" />
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
