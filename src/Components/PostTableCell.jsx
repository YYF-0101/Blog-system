import { useState } from "react"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ProductEditDialog from "./ProductEditDialog";
import Box from '@mui/material/Box';

const PostTableCell = ({ products, onDelet, onSuccess, onSearch }) => {
  const [onEdit, setOnEdite] = useState(false)
  const [selectedProd, setSelectedProd] = useState("")


  const onOpen = (prod) => {
    setOnEdite(!onEdit)
    setSelectedProd(prod)
  }

  const onClose = () => {
    setOnEdite(!onEdit)
  }

  return (
    <>
      {
        products.filter(product => {
          if (onSearch === '') {
            return product;
          } else if (product.title.toLowerCase().includes(onSearch.toLowerCase())) {
            return product;
          }
        })
          .map((product) => (
            <TableRow
              key={product.id}
              id={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                {product.product_image && <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt={`${product.title} image`}
                  src={`https://app.spiritx.co.nz/storage/${product.product_image}`} />}
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" startIcon={<EditIcon />} size="medium" onClick={() => onOpen(product)} />
                <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ ml: 1.5 }} onClick={() => onDelet(product.id)} />
              </TableCell>
            </TableRow>
          ))
      }
      <ProductEditDialog open={onEdit} handleClose={onClose} selectedProduct={selectedProd} onSuccess={onSuccess} />
    </>

  )
}

export default PostTableCell