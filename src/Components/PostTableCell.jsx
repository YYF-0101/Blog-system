import { useRef, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { Dialog, DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DialogTitle } from '@mui/material';

const PostTableCell = ({ products, onDelet, onToggle, editNum, onCancel, productsOpacity, addNew, onUpdata, setPicture, tableCellEdit, setTableCellEdit, deleteImg }) => {

  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState([])
  const [img, setImg] = useState(true)
  const inputRef = useRef(null);

  const handleClickOpen = (prop) => {
    setOpen(true);
    setDialog(prop)
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    setTableCellEdit({ ...tableCellEdit, [e.target.name]: e.target.value });
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
                  type='number'
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
                {product.product_image &&
                  <Box
                    component="img"
                    sx={{
                      height: 93,
                      width: 200,
                      maxHeight: { xs: 93, md: 37 },
                      maxWidth: { xs: 200, md: 100 },
                    }}
                    alt={`${product.title} image`}
                    src={`https://app.spiritx.co.nz/storage/${product.product_image}`} />}
                {!product.product_image && editNum !== index && img &&
                  <Box sx={{
                    height: 133,
                    width: 250,
                    maxHeight: { xs: 133, md: 67 },
                    maxWidth: { xs: 250, md: 150 },
                  }}></Box>}

                {product.product_image && editNum === index &&
                  <IconButton
                    sx={{
                      fontSize: 34,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => {
                      setImg(false)
                      deleteImg(product)
                    }}
                  >
                    <HighlightOffIcon
                    />
                  </IconButton>
                }
                {/* {!product.product_image && editNum === index && !img &&
                  <Box ><input name="product_image" ref={inputRef} accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setPicture(e.target.files[0])} /></Box>
                } */}
                {!product.product_image && editNum === index &&
                  <Box ><input name="product_image" ref={inputRef} accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setPicture(e.target.files[0])} /></Box>
                }
              </Box>

            </TableCell>
            <TableCell align="right">
              {
                editNum === index ?
                  <>
                    <Button variant="outlined" startIcon={<DoneIcon />} size="medium" onClick={() => product.title ? onUpdata(tableCellEdit) : addNew(tableCellEdit)} />
                    <Button variant="outlined" startIcon={<CancelIcon />} sx={{ ml: 1.5 }} onClick={() => onCancel(index)} />
                  </>
                  :
                  <>
                    <Button variant="outlined" sx={{ ml: 1.5 }} onClick={() => {
                      onToggle(index)
                      setTableCellEdit(() => product)
                    }} >EDIT</Button>
                    <Button variant="outlined" sx={{ ml: 1.5 }} onClick={() => handleClickOpen(product)} ><DeleteIcon /></Button>
                  </>
              }
            </TableCell>
          </TableRow>
        ))
      }
      <Dialog open={open} >
        <DialogTitle >
          Data:{dialog.id}
        </DialogTitle>
        <DialogContent>
          Are you sure to delete?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onDelet(dialog.id)
            handleClose()
          }}>
            Yes
          </Button>
          <Button onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default PostTableCell


//<Button variant="outlined" startIcon={<EditIcon />} size="medium" onClick={() => onOpen(product)} />
