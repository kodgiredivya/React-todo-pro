import React from 'react'
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import "./App.css"
import Navigation from './components/Navigation'
import { Login, Register, PageNotFound, AddTodo, Account, Dashboard } from './pages'
import { useState, createContext } from 'react'
import LoginOnly from './components/LoginOnly'
export const UserState = createContext()

export default function App() {
  const [login, setlogin] = useState({})
  const [showModal, setshowModal] = useState(false)
  const [editId, seteditId] = useState()
  const [nav, setnav] = useState()

  const [editModalData, seteditModalData] = useState({
    mtask: "hi",
    mdesc: "",
    mpriority: "",
    mcategory: ""
  })

  const handleClass = (ref) => {
    console.log(ref, "component being rendered");
    console.log(nav);
    setTimeout(() => {
      setnav(document.getElementById("navbar").clientHeight)
      if (nav > 200) {
        console.log("Add padding");
        ref.current.style.padding = '20rem 0rem 5rem 0rem';
        ref.current.style.transition = '.5s';
      } else {
        ref.current.style.padding = '5rem 0rem'
      }
    }, 30);
  }


  return (<UserState.Provider value={{
    login, setlogin,
    showModal, setshowModal,
    editModalData, seteditModalData,
    editId, seteditId,
    handleClass
  }}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/account" element={<LoginOnly element={<Account />} />} />
        <Route path="/addtodo" element={<LoginOnly element={<AddTodo />} />} />
        <Route path="/dashboard" element={< Dashboard />} />
      </Routes>
    </BrowserRouter>
  </UserState.Provider>
  )
}
