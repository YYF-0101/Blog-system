import { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate, } from "react-router-dom"
import { auth, Timer } from './utils'
import LoginPage from './Pages/LoginPage'
import Products from './Pages/Products'
import Header from './Layout/Header'
import SnackBar from './Components/SnackBar'

function App() {
  // test@gradspace.org  qwer1234
  const [searchedValue, setSearchedValue] = useState()
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (Timer() && auth()) {
      localStorage.clear()
      setMessage('timeOut')
      navigate('../')
    }
  }, [])

  return (
    <>
      <Header setSearchedValue={setSearchedValue} setInputValue={setInputValue} inputValue={inputValue} setMessage={setMessage} />
      <Routes>
        <Route path="/" element={<LoginPage setMessage={setMessage} />} />
        <Route path="/products" element={auth() ? <Products searchedValue={searchedValue} setSearchedValue={setSearchedValue} setInputValue={setInputValue} setMessage={setMessage} /> : <Navigate to="/" />} />
      </Routes>
      <SnackBar message={message} setMessage={setMessage} />
    </>
  )
}

export default App;
