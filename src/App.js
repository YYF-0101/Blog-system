import axios from 'axios';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth } from './utils';
import { BaseUrl } from './environment';
import LoginPage from "./Pages/LoginPage";
import Products from "./Pages/Products";
import Header from "./Layout/Header";
import { useState } from 'react';
import SnackBar from './Components/SnackBar'


function App() {
  // test@gradspace.org  qwer1234

  const [searchedValue, setSearchedValue] = useState()
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const now = new Date().getTime()


  const authUser = (user) => {
    axios.post(`${BaseUrl}login`, user)
      .then(res => {
        localStorage.setItem('luxdream-yanfengYang-token', res.data.token.token)
        setMessage("success")
        navigate("../products")
        localStorage.setItem('setupTime', now)
      })
      .catch(error => {
        setMessage("wrong")
        console.error('There was an error!', error)
      })

  }

  const logOut = () => {
    localStorage.clear()
    setMessage("logOut")
    navigate("../")
  }

  return (
    <>
      <Header logOut={logOut} setSearchedValue={setSearchedValue} setInputValue={setInputValue} inputValue={inputValue} />
      <Routes>
        <Route path="/" element={<LoginPage authUser={authUser} />} />
        <Route path="/products" element={auth() ? <Products searchedValue={searchedValue} setSearchedValue={setSearchedValue} setInputValue={setInputValue} /> : <Navigate to="/" />} />
        {/* <Route path="/products" element={<Product />} /> */}
      </Routes>
      <SnackBar handleMessage={message} setMessage={setMessage} />
    </>
  )
}

export default App;
