import { Link, Route, Router, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import Admin from "./pages/admin"
import LoginPage from "./pages/login"
import Test from "./pages/test"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <>

    <div className="bg-primary flex h-screen w-full text-tertiary">
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>

     </div>
     
    </>
  )
}

export default App
