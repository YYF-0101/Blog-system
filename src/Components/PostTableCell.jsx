import axios from "axios"
import { useEffect, useState } from "react"
import { AllProductsUrl } from "../Resources/API"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const PostTableCell = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${AllProductsUrl}`)
      .then(response => setProducts(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      {
        products.map((product) => (
          <TableRow
            key={product.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {product.title}
            </TableCell>
            <TableCell align="right">{product.description}</TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align="right">{product.product_image}</TableCell>
          </TableRow>
        ))
      }
    </>

  )
}

export default PostTableCell