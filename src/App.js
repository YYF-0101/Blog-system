import axios from 'axios';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth } from './utils';
import { BaseUrl } from './environment';
import LoginPage from "./Pages/LoginPage";
import Products from "./Pages/Products";
import Header from "./Layout/Header";
import { useState } from 'react';
import SnackBar from './Components/SnackBar';

function App() {
  // test@gradspace.org  qwer1234

  const navigate = useNavigate()
  const [searchedValue, setSearchedValue] = useState()
  const [inputValue, setInputValue] = useState("")
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)

  const authUser = (user) => {
    axios.post(`${BaseUrl}login`, user)
      .then(res => {
        localStorage.setItem('luxdream-yanfengYang-token', res.data.token.token)
        setOpenMsg("success")
        setOpen(true)
        navigate("../products")
      })
      .catch(error => {
        setOpen(true)
        setOpenMsg("unsuccess")
        console.error('There was an error!', error)
      })

  }

  const logOut = () => {
    localStorage.clear()
    navigate("../")
  }

  // window.onunload = () => {
  //   //Clear the local storage
  //   window.localStorage.clear()
  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }


  return (
    <>
      <Header logOut={logOut} setSearchedValue={setSearchedValue} setInputValue={setInputValue} inputValue={inputValue} />
      <Routes>
        <Route path="/" element={<LoginPage authUser={authUser} />} />
        <Route path="/products" element={auth() ? <Products searchedValue={searchedValue} setSearchedValue={setSearchedValue} setInputValue={setInputValue} /> : <Navigate to="/" />} />
        {/* <Route path="/products" element={<Product />} /> */}
      </Routes>
      <SnackBar openMsg={openMsg} open={open} handleClose={handleClose} />
    </>
  )
}

export default App;
