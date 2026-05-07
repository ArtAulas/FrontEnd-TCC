import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup.tsx'
import Login from './Signin.tsx'
import Verify from './2FACode.tsx'
import Welcome from './Welcome.tsx'
import Home from './Home.tsx'
import PostDetail from './PostDetail.tsx'
import UserPage from './User.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail/>}/>
        <Route path="/user/:id" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}