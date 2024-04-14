import React, { useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import { createContext } from 'react';
import Componies from './components/Companies';
import CompanyAdmins from './components/ComponyAdmins';

export const AppContext = createContext(null);

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Componies/>}/> 
        <Route path='/:companyName/:companyId/admins' element={<CompanyAdmins/>}/> 
          
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={"$404"}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App