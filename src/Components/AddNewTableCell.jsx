import { useRef, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import { IconButton, TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadIcon from '@mui/icons-material/Upload'

const AddNewTableCell = ({ setPicture, addNew, onAdd, setSelectedFile, preview, setPreview }) => {
  const inputRef = useRef(null)
  const [newProduct, setNewProduct] = useState({})

  const handleChange = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  return (
    <TableRow >
      <TableCell component="th" scope="row">
        <TextField
          name='title'
          onChange={e => {
            handleChange(e)
          }}
        />
      </TableCell>
      <TableCell align="right" >
        <TextField
          name='description'
          onChange={e => {
            handleChange(e)
          }}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type='number'
          name='price'
          InputProps={{ inputProps: { min: 0 } }}
          onChange={e => {
            handleChange(e)
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "inline-block",
            position: 'relative',
          }}>
          <Box sx={{
            display: "flex"
          }}>
            {preview && <Box
              component="img"
              sx={{
                height: 93,
                width: 200,
                maxHeight: { xs: 93, md: 37 },
                maxWidth: { xs: 200, md: 100 },
              }} src={preview} />}
            <Box>
              <IconButton component="label" htmlFor="addNew-file"><UploadIcon /></IconButton>
              <input hidden name="product_image" ref={inputRef} accept="image/*" id="addNew-file" multiple type="file" onChange={(e) => {
                setSelectedFile(e.target.files[0])
                setPicture(e.target.files[0])
              }} />
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",

        }}>
          <IconButton
            disabled={!newProduct.title || !newProduct.description || !newProduct.price}
            variant="outlined"
            size="medium"
            onClick={() => {
              addNew(newProduct)
              setPreview(undefined)
            }} ><DoneIcon /></IconButton>
          <IconButton variant="outlined" onClick={() => {
            onAdd()
            setPreview(undefined)
          }
          }><CancelIcon /></IconButton>
        </Box>
      </TableCell>
    </TableRow >
  )
}

export default AddNewTableCell