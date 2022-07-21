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
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { TextField } from '@mui/material';

const Product = () => {
  const [products, setProducts] = useState([])
  const [sorting, setSorting] = useState(false)
  const [titleIcon, setTitleIcon] = useState(false)
  const [filteredProduct, setFilteredProduct] = useState([])
  const [search, setSearch] = useState('')

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

  const submitForm = (e) => {
    e.preventDefault()

    setFilteredProduct(products.filter(product => {
      if (search === '') {
        return product;
      } else if (product.title && product.title.toLowerCase().includes(search.toLowerCase())) {
        return product;
      } else if (product.description && product.description.toLowerCase().includes(search.toLowerCase())) {
        return product;
      }
    }))
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <TextField
          placeholder="Search Title and Description"
          type="search"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={e => setSearch(e.target.value)} />
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <PostTableHeaderCell onSort={onSort} titleIcon={titleIcon} />
            </TableRow>
          </TableHead>
          <TableBody>
            <PostTableCell products={filteredProduct.length ? filteredProduct : products} onDelet={onDelet} onSuccess={onSuccess} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Product