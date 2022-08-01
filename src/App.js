import axios from 'axios';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth, BaseUrl } from './Resources/API';
import LoginPage from "./Pages/LoginPage";
import Products from "./Pages/Products";
import Header from "./Pages/Header";

function App() {
  // test@gradspace.org  qwer1234

  const navigate = useNavigate()

  const authUser = (user) => {
    console.log(user)

    axios.post(`${BaseUrl}login`, user)
      .then(res => loggedIn(res))
      .catch(error => console.error('There was an error!', error))

  }

  const loggedIn = (e) => {
    console.log(e)
    localStorage.setItem('luxdream-yanfengYang-token', e.data.token.token)
    console.log(localStorage.getItem('luxdream-yanfengYang-token'))
    navigate("../products")
  }

  const logOut = () => {
    localStorage.clear()
    navigate("../")
  }

  window.onunload = () => {
    // Clear the local storage
    window.localStorage.clear()
  }


  console.log(localStorage.getItem('luxdream-yanfengYang-token'))
  return (
    <>
      <Header logOut={logOut} />
      <Routes>
        <Route path="/" element={<LoginPage authUser={authUser} />} />
        <Route path="/products" element={auth() ? <Products /> : <Navigate to="/" />} />
        {/* <Route path="/products" element={<Product />} /> */}
      </Routes>
    </>
  )
}

export default App;
