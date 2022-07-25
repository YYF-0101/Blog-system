import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Product from "./Pages/Product";

function App() {
  // test@gradspace.org  qwer1234
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
