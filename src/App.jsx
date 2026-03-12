import { Link, Route, Router, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import Admin from "./pages/admin"
import LoginPage from "./pages/login"


function App() {

  return (
    <>

    <div className="bg-primary flex h-screen w-full text-tertiary">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

     </div>
     
    </>
  )
}

export default App
