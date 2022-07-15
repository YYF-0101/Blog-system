import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PostTableCell from '../Components/PostTableCell';
import axios from "axios"
import { useEffect, useState } from "react"
import { AllProductsUrl } from "../Resources/API"

const Product = () => {
  const [products, setProducts] = useState([])

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Product&nbsp;image</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PostTableCell products={products} onDelet={onDelet} onSuccess={onSuccess} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Product