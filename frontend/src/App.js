import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {About} from "./components/About";
import {Blog} from "./components/Blog";
import {Navbar} from "./components/Navbar"

function App() {
  return (
   <Router>
     <Navbar/>
     <div className="container p-4">
       <Routes>
         <Route path="/about" element={<About/>} />
         <Route path="/" element={<Blog/>} />
       </Routes>
     </div>
   </Router>
  );
}

export default App;
