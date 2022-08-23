import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const ProductDialog = ({ open, dialogData, onOpen, update, addNew }) => {
  //const element = document.querySelector('#put-request-error-handling .date-updated')

  const [dialogProduct, setDialogProduct] = useState()
  const inputRef = useRef(null);

  useEffect(() => {
    setDialogProduct({ id: dialogData.id })
  }, [dialogData.id])

  const handleChange = (e) => {
    setDialogProduct({ ...dialogProduct, [e.target.name]: e.target.name === "product_image" ? e.target.files[0] : e.target.value });
    console.log(dialogProduct)
  }

  const deleteImg = () => {
    console.log("deleted")
    inputRef.current.value = null;
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{dialogData.id ? `Edit Product #${dialogData.id}` : `Add New Product`}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 500,
          maxWidth: '100%',
        }}>
        <TextField
          name='title'
          label={'Title'}
          id="margin-dense"
          margin="dense"
          defaultValue={dialogData.title}
          onChange={e => handleChange(e)}
        />
        <TextField
          name='description'
          label={'Description'}
          id="margin-dense"
          margin="dense"
          defaultValue={dialogData.description}
          onChange={e => handleChange(e)}
        />
        <TextField
          name='price'
          label={'Price'}
          id="margin-dense"
          margin="dense"
          defaultValue={dialogData.price}
          onChange={e => handleChange(e)}
        />
        <label htmlFor="contained-button-file">
          {dialogData.product_image ?
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
                alt={`${dialogData.title} image`}
                src={`https://app.spiritx.co.nz/storage/${dialogData.product_image}`} />
              <HighlightOffIcon
                sx={{
                  fontSize: 34,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }} onClick={() => deleteImg()} />
            </Box>
            : <input name="product_image" ref={inputRef} accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => handleChange(e)} />}
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOpen}>Cancel</Button>
        <Button variant="contained" endIcon={<SendIcon />} type="submit" onClick={() => dialogData.id ? update(dialogProduct) : addNew(dialogProduct)}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDialog


//<Button sx={{ visibility: updateProduct ? "visible" : "hidden" }} onClick={handleClear}>Clear</Button>
