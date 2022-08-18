import axios from 'axios';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth } from './utils';
import { BaseUrl } from './environment';
import LoginPage from "./Pages/LoginPage";
import Products from "./Pages/Products";
import Header from "./Layout/Header";
import { useEffect, useState } from 'react';
import SnackBar from './Components/SnackBar';

function App() {
  // test@gradspace.org  qwer1234

  const navigate = useNavigate()
  const [searchedValue, setSearchedValue] = useState()
  const [inputValue, setInputValue] = useState("")
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [barTxt, setBarTxt] = useState('')
  const [barTimer, setBarTimer] = useState()
  const hours = 1
  const now = new Date().getTime()
  const setupTime = localStorage.getItem('setupTime')

  useEffect(() => {
    if (now - setupTime > hours * 60 * 1000 && setupTime) {
      localStorage.clear()
      localStorage.setItem('setupTime', now)
      handleMessage("timeOut")
    }
  }, [auth()])

  const authUser = (user) => {
    axios.post(`${BaseUrl}login`, user)
      .then(res => {
        localStorage.setItem('luxdream-yanfengYang-token', res.data.token.token)
        handleMessage("success")
        navigate("../products")
        localStorage.setItem('setupTime', now)
      })
      .catch(error => {
        handleMessage("wrong")
        console.error('There was an error!', error)
      })

  }

  const logOut = () => {
    localStorage.clear()
    handleMessage("logOut")
    navigate("../")
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }

  const handleMessage = prop => {
    setOpen(true)
    switch (true) {
      case prop == "success":
        setBarTxt("You are successfully logged in")
        setBarTimer(4000)
        setOpenMsg("success")
        break;
      case prop == "wrong":
        setBarTxt(" You have entered an invalid username or password")
        setBarTimer(2000)
        setOpenMsg("error")
        break;
      case prop == "timeOut":
        setBarTxt(" Time Out! Please Login again.")
        setBarTimer(2000)
        setOpenMsg("error")
        break;
      case prop == "logOut":
        setBarTxt(" You are now logged out")
        setBarTimer(2000)
        setOpenMsg("error")
        break;
      default:
        break;
    }
  }


  return (
    <>
      <Header logOut={logOut} setSearchedValue={setSearchedValue} setInputValue={setInputValue} inputValue={inputValue} />
      <Routes>
        <Route path="/" element={<LoginPage authUser={authUser} />} />
        <Route path="/products" element={auth() ? <Products searchedValue={searchedValue} setSearchedValue={setSearchedValue} setInputValue={setInputValue} /> : <Navigate to="/" />} />
        {/* <Route path="/products" element={<Product />} /> */}
      </Routes>
      <SnackBar openMsg={openMsg} open={open} handleClose={handleClose} txt={barTxt} time={barTimer} />
    </>
  )
}

export default App;
