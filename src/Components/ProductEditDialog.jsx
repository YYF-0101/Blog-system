import React, { useEffect, useState } from 'react'
import axios from "axios"
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';

const ProductEditDialog = ({ open, handleClose, selectedProduct, onSuccess }) => {
  //const element = document.querySelector('#put-request-error-handling .date-updated')
  const [data, setData] = useState([])
  const [updateProduct, setUpdateProduct] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  })

  useEffect(() => {
    setUpdateProduct({ id: selectedProduct.id })
  }, [selectedProduct.id])

  const handleChange = (prop) => (event) => {
    setUpdateProduct({ ...updateProduct, [prop]: event.target.value });
  }

  const submitChange = (e) => {
    e.preventDefault()

    console.log(updateProduct)
    axios.put(`https://app.spiritx.co.nz/api/product/${updateProduct.id}`, updateProduct)
      .then(res => onSuccess(res.data)
      )
      .catch(error => console.error('There was an error!', error));

    setUpdateProduct('')
    handleClose()
  }

  const handleClear = (pro) => {
    setUpdateProduct({
      title: pro.title,
      description: pro.description,
      price: pro.price,
    })
  }


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Product #{selectedProduct.id}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 500,
          maxWidth: '100%',
        }}>
        <TextField
          label={'Title'}
          id="margin-dense"
          margin="dense"
          defaultValue={selectedProduct.title}
          onChange={handleChange('title')}
        />
        <TextField
          label={'Description'}
          id="margin-dense"
          margin="dense"
          defaultValue={selectedProduct.description}
          onChange={handleChange('description')}
        />
        <TextField
          label={'Price'}
          id="margin-dense"
          margin="dense"
          defaultValue={selectedProduct.price}
          onChange={handleChange('price')}
        />
        <label htmlFor="contained-button-file">
          <input accept="image/*" id="contained-button-file" multiple type="file" />
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" endIcon={<SendIcon />} type="submit" onClick={(e) => submitChange(e)}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductEditDialog


//<Button sx={{ visibility: updateProduct ? "visible" : "hidden" }} onClick={handleClear}>Clear</Button>
