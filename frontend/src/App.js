import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {About} from "./components/About";
import {Blog} from "./components/Blog";
import {Navbar} from "./components/Navbar"
import {Info} from "./components/Info"


function App() {
  return (
   <Router>
     <Navbar/>
     <div className="container p-4">
       <Routes>
         <Route path="/" element={<About/>} />
         <Route path="/blog" element={<Blog/>} />
         <Route path="/info/:blog_id" element={<Info/>} />
       </Routes>
     </div>
   </Router>
  );
}

export default App;
