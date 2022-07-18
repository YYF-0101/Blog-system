import React, { useEffect, useState } from 'react'
import axios from "axios"
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ProductEditDialog = ({ open, handleClose, selectedProduct, onSuccess }) => {
  //const element = document.querySelector('#put-request-error-handling .date-updated')
  const [updateProduct, setUpdateProduct] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    product_image: '',
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

  const deleteImg = () => {
    console.log("deleted")
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
        <TextField
          label={'ImgUrl'}
          id="margin-dense"
          margin="dense"
          defaultValue={selectedProduct.product_image}
          onChange={handleChange('product_image')}
        />
        <label htmlFor="contained-button-file">
          {selectedProduct.product_image ?
            <Box
              sx={{ position: 'relative', width: '50%' }}>
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt={`${selectedProduct.title} image`}
                src={`https://app.spiritx.co.nz/storage/${selectedProduct.product_image}`} />
              <HighlightOffIcon
                sx={{
                  fontSize: 34,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }} onClick={() => deleteImg()} />
            </Box>
            : <input accept="image/*" id="contained-button-file" multiple type="file" />}
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
