import { Link, Route, Router, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import Admin from "./pages/admin"
import LoginPage from "./pages/login"
import Test from "./pages/test"
import { Toaster } from "react-hot-toast"
import RegisterPage from "./pages/register"
import ForgetPassword from "./pages/forgetPassword"
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {

  return (
    <GoogleOAuthProvider clientId="694637553728-bnic0n4aik3235d33oku2i8gtsn97q5u.apps.googleusercontent.com">

    <div className="bg-primary flex min-h-screen w-full text-tertiary">
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/admin/*" element={< Admin/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/test" element={<Test />} />
      </Routes>

     </div>
     
    
    </GoogleOAuthProvider>
  )
}

export default App
