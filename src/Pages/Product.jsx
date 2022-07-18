import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PostTableHeaderCell from '../Components/PostTableHeaderCell';
import PostTableCell from '../Components/PostTableCell';
import axios from "axios"
import { useEffect, useState } from "react"
import { AllProductsUrl } from "../Resources/API"

const Product = () => {
  const [products, setProducts] = useState([])
  const [sorting, setSorting] = useState(false)
  const [titleIcon, setTitleIcon] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios.get(`${AllProductsUrl}`)
      .then(response => setProducts(response.data))
      .catch(error => console.log(error))
  }, [])

  const onDelet = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const onSuccess = data => {
    setProducts(products.map((product) => product.id === data.id ? data : product))
  }

  const onSort = (cell) => {
    console.log("clicked" + cell)
    setSorting(!sorting)
    switch (true) {

      case cell === "Title" && sorting === false:
        setProducts([...products].sort(function (a, b) {
          return a.title?.localeCompare(b.title)
        }))
        setTitleIcon(!titleIcon)
        break;

      case cell === "Title" && sorting === true:
        setProducts([...products].sort(function (a, b) {
          return b.title?.localeCompare(a.title)
        }))
        setTitleIcon(!titleIcon)
        break;

      case cell === "Description" && sorting === false:
        setProducts([...products].sort(function (a, b) {
          return a.description?.localeCompare(b.description)
        }))
        break;

      case cell === "Description" && sorting === true:
        setProducts([...products].sort(function (a, b) {
          return b.description?.localeCompare(a.description)
        }))
        break;

      case cell === "Price" && sorting === false:
        setProducts([...products].sort(function (a, b) {
          return a.price - b.price
        }))
        break;

      case cell === "Price" && sorting === true:
        setProducts([...products].sort(function (a, b) {
          return b.price - a.price
        }))
        break;

      default:
        console.log("wrong click")
        break;
    }
  }

  return (
    <>
      <input placeholder="Enter Title" onChange={event => setSearchInput(event.target.value)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <PostTableHeaderCell onSort={onSort} titleIcon={titleIcon} />
            </TableRow>
          </TableHead>
          <TableBody>
            <PostTableCell products={products} onDelet={onDelet} onSuccess={onSuccess} onSearch={searchInput} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Product