import React, {useState, useEffect} from 'react';
import Home from './page/home';
import Signup from './page/signup';
import Auth from './page/login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Blog from './page/postBlog';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                       
               <Route path="/" element={<Home/>}/>
               <Route path="/signup" element={<Signup/>}/>
             <Route path="/Auth" element={<Auth/>}/> 
             <Route path="/Blog" element={<Blog/>}/> 
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;