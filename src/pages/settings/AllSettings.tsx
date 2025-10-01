import { useState } from "react";
import { PasswordSettings } from "./PasswordSettings";
import { LoginSettings } from "./LoginSettings";
import { ImagePicker } from "./ImagePicker";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"password" | "login" | "avatar">("password");

  return (
    <div className="min-h-screen flex bg-slate-900">
      <div className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        <button
          className={`text-left p-3 rounded-lg transition 
            ${activeTab === "password" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          onClick={() => setActiveTab("password")}
        >
          Password
        </button>

        <button
          className={`text-left p-3 rounded-lg transition 
            ${activeTab === "login" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`text-left p-3 rounded-lg transition 
            ${activeTab === "avatar" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
          onClick={() => setActiveTab("avatar")}
        >
          Avatar
        </button>
      </div>

      <div className="flex-1 p-8">
        {activeTab === "password" && <PasswordSettings />}
        {activeTab === "login" && <LoginSettings />}
        {activeTab === "avatar" && <ImagePicker/>}
      </div>
    </div>
  );
};
