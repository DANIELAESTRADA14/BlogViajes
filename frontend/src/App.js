import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {About} from "./components/About";
import {Blog} from "./components/Blog";
import {Navbar} from "./components/Navbar"
import {Info} from "./components/Info"
import { Login } from "./components/Login";


function App() {
  return (
   <Router>
     <Navbar/>
     <div className="container p-4">
       <Routes>
         <Route path="/about" element={<About/>} />
         <Route path="/blog" element={<Blog/>} />
         <Route path="/info/:blog_id" element={<Info/>} />
         <Route path="/" element={<Login/>} />
       </Routes>
     </div>
   </Router>
  );
}

export default App;
