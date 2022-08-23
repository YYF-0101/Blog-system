import { useState } from 'react'
import { Route, Routes, Navigate, } from "react-router-dom"
import { auth } from './utils'
import LoginPage from "./Pages/LoginPage"
import Products from "./Pages/Products"
import Header from "./Layout/Header"
import SnackBar from './Components/SnackBar'

function App() {
  // test@gradspace.org  qwer1234

  const [searchedValue, setSearchedValue] = useState()
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")

  return (
    <>
      <Header setSearchedValue={setSearchedValue} setInputValue={setInputValue} inputValue={inputValue} setMessage={setMessage} />
      <Routes>
        <Route path="/" element={<LoginPage setMessage={setMessage} />} />
        <Route path="/products" element={auth() ? <Products searchedValue={searchedValue} setSearchedValue={setSearchedValue} setInputValue={setInputValue} /> : <Navigate to="/" />} />
        {/* <Route path="/products" element={<Product />} /> */}
      </Routes>
      <SnackBar handleMessage={message} setMessage={setMessage} />
    </>
  )
}

export default App;
