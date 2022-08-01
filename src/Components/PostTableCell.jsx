import { useRef, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PostTableCell = ({ products, onDelet, onOpen, onToggle, editNum, onCancel, productsOpacity, addNew }) => {

  const [tableCellEdit, setTableCellEdit] = useState([])
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setTableCellEdit({ ...tableCellEdit, [e.target.name]: e.target.name === "product_image" ? e.target.files[0] : e.target.value });
  }

  return (
    <>
      {
        products.map((product, index) => (
          <TableRow
            key={index}
            id={product.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              opacity: productsOpacity ? (editNum === index ? "1" : "0.2") : "1",
            }}
          >
            <TableCell component="th" scope="row">
              {editNum === index ?
                <TextField
                  name='title'
                  defaultValue={product.title}
                  onChange={e => handleChange(e)}
                />
                : <div>{product.title}</div>}
            </TableCell>
            <TableCell align="right" >
              {editNum === index ?
                <TextField
                  name='description'
                  defaultValue={product.description}
                  onChange={e => handleChange(e)}
                />
                : <div>{product.description}</div>
              }

            </TableCell>
            <TableCell align="right">
              {editNum === index ?
                <TextField
                  name='price'
                  defaultValue={product.price}
                  onChange={e => handleChange(e)}
                />
                : <div>{product.price}</div>
              }
            </TableCell>
            <TableCell align="right">
              <Box
                sx={{
                  display: "inline-block",
                  position: 'relative',
                }}>
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
                {editNum === index && product.product_image &&
                  <HighlightOffIcon
                    sx={{
                      fontSize: 34,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }} />
                }
              </Box>
              {editNum === index &&

                <input name="product_image" ref={inputRef} accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => handleChange(e)} />
              }
            </TableCell>
            <TableCell align="right">
              {
                editNum === index ?
                  <>
                    <Button variant="outlined" startIcon={<DoneIcon />} size="medium" onClick={() => addNew(tableCellEdit)} />
                    <Button variant="outlined" startIcon={<CancelIcon />} sx={{ ml: 1.5 }} onClick={() => onCancel(index)} />
                  </>
                  :
                  <>
                    <Button variant="outlined" startIcon={<EditIcon />} size="medium" onClick={() => onOpen(product)} />
                    <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ ml: 1.5 }} onClick={() => onDelet(product.id)} />
                    <Button variant="outlined" sx={{ ml: 1.5 }} onClick={() => {
                      onToggle(index)
                      setTableCellEdit({ id: product.id })
                    }} >EDIT</Button>
                  </>
              }

            </TableCell>
          </TableRow>
        ))
      }
    </>

  )
}

export default PostTableCell