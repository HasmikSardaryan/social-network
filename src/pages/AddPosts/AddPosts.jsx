import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image, Send } from "lucide-react";
// import type { IResponse } from "../../types";
import { Axios } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export const AddPosts = () => {

  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const form = new FormData()
      form.append('photo', image);
      form.append('content', content);

      Axios
      .post(('/posts'), form)
      .then((res) => {
        console.log(res.data.payload);
        navigate('/');
      })

    console.log('hello');
    
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-500"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pl-8 pr-4 -mt-16 max-w-3xl"
      >
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Create a New Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="What's on your mind?"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 font-medium">
                Upload Image
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 cursor-pointer transition">
                  <Image className="h-4 w-4" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 rounded-xl w-full object-cover max-h-72 border border-slate-700"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-all font-medium"
            >
              <Send className="h-4 w-4" />
              <span>Post</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
