import { createBrowserRouter } from "react-router-dom";
import { Login }  from "./pages/LoginPage/LoginPage";
import { Signup } from "./pages/SignupPage/SignupPage";
import { Profile } from "./pages/ProfilePage/ProfilePage";
import { SettingsPage } from "./pages/settings/AllSettings";
import { AddPosts } from './pages/AddPosts/AddPosts'

export const router = createBrowserRouter([
    { path: '', element: <Signup/> },
    { path: '/login', element: <Login/> },
    { path: '/signup', element: <Signup/> },
    { path: '/profile', element: <Profile/> },
    { path: '/settings', element: <SettingsPage/> },
    { path: '/posts', element: <AddPosts/> }

])