import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { User, Settings, Edit3, Users, Image, LogOut, Import } from "lucide-react";
import useAuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";

export const Profile = () => {
  const { user, loading} = useAuthContext(); 
  const navigate = useNavigate();


  const handleLogout = async() => {
    try {
      Axios.post('/logout');
      navigate('/login');
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(user);
    
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return user && (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-500"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pl-8 pr-4 -mt-16 max-w-4xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-start">
          <div className="flex items-end space-x-4">
            <div className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center">
              {user.picture ?
              <img src={user.picture } alt="avatar" className="w-16 h-16 rounded-full" /> :
              <User className="w-16 h-16 text-slate-300" /> }
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-slate-400">@{user.login}</p>
              <div className="flex space-x-4 mt-2 text-slate-300 text-sm">
                <span>
                  <strong>{user.followers.length}</strong> Followers
                </span>
                <span>
                  <strong>{user.following.length}</strong> Following
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0 sm:ml-6">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm flex items-center space-x-2">
              <Edit3 className="h-4 w-4" /> <span>Edit Profile</span>
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200 text-sm flex items-center space-x-2">
              <Settings className="h-4 w-4" /> <Link to='/settings'>Settings</Link>
            </button>
          </div>
        </div>

        <p className="text-slate-300 mt-4 max-w-2xl">
          Passionate developer, coffee lover ☕, and open-source enthusiast.
          Building amazing products one line of code at a time.
        </p>

        <div className="flex border-b border-slate-700 mt-6">
          <button className="px-4 py-2 text-blue-400 border-b-2 border-blue-500 font-medium">
            Posts
          </button>
          <button className="px-4 py-2 text-slate-400 hover:text-white">
            Media
          </button>
          <button className="px-4 py-2 text-slate-400 hover:text-white">
            About
          </button>
        </div>

        <div className="space-y-4 mt-6">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-slate-800 rounded-xl p-4 shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                <span className="text-slate-200 font-medium">John Doe</span>
                <span className="text-slate-400 text-sm">• 2h ago</span>
              </div>
              <p className="text-slate-200">
                This is a sample post content. It can contain text, links, or
                media preview.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-start space-x-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200">
            <Users className="h-4 w-4" /> <span>Followers</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-200">
            <Image className="h-4 w-4" /> <span>Media</span>
          </button>
          <button
            onClick={() => handleLogout()}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white"
          >
            <LogOut className="h-4 w-4" />
          < span>Log Out</span>
          </button> 
        </div>
      </motion.div>
    </div>
  );
};
