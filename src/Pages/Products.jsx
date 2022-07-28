import { useState, useEffect } from 'react'
import axios from "axios"
import { BaseUrl } from "../Resources/API"
import ProductDialog from '../Components/ProductDialog'
import PostTableHeaderCell from '../Components/PostTableHeaderCell'
import PostTableCell from '../Components/PostTableCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import { InputAdornment } from '@mui/material'
import { TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

const Product = () => {
  const [products, setProducts] = useState([])
  const [sorting, setSorting] = useState(false)
  const [titleIcon, setTitleIcon] = useState(false)
  const [filteredProduct, setFilteredProduct] = useState([])
  const [search, setSearch] = useState('search')
  const [isOpen, setIsOpen] = useState(false)
  const [dialogData, setDialogData] = useState("")
  const defaultProduct = {
    id: '',
    title: '',
    description: '',
    price: '',
    product_image: '',
  }

  useEffect(() => {
    axios.get(`${BaseUrl}products`)
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
        return null;
      } else if (product.title && product.title.toLowerCase().includes(search.toLowerCase())) {
        return product;
      } else if (product.description && product.description.toLowerCase().includes(search.toLowerCase())) {
        return product;
      }
    }))
  }

  const onOpen = (prod) => {
    setIsOpen(!isOpen)
    prod && setDialogData(prod)
  }

  const updataData = (prod) => {

    console.log(prod)
    axios.put(`https://app.spiritx.co.nz/api/product/${prod.id}`, prod)
      .then(res => onSuccess(res.data))
      .catch(error => console.error('There was an error!', error));
    setIsOpen(!isOpen)

    /*

    const formData = new FormData()
    formData.append("id", dialogProduct.id)
    formData.append("title", dialogProduct.title)
    formData.append("description", dialogProduct.description)
    formData.append("price", dialogProduct.price)
    if (dialogProduct.product_image) {
      formData.append('product_image', dialogProduct.product_image)
    }

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    
    //setUpdateProduct(defaultProduct)
    */

  }

  const addNewData = (prod) => {
    console.log(prod)
    axios.post(`https://app.spiritx.co.nz/api/products`, prod)
      .then(res => console.log(res.data))
      .catch(error => console.error('There was an error!', error));
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

        <IconButton onClick={() => onOpen(defaultProduct)} ><AddIcon /></IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <PostTableHeaderCell onSort={onSort} titleIcon={titleIcon} />
            </TableRow>
          </TableHead>
          <TableBody>
            <PostTableCell products={filteredProduct.length ? filteredProduct : products} onOpen={onOpen} onDelet={onDelet} />
          </TableBody>
        </Table>
        <ProductDialog dialogData={dialogData.id ? dialogData : defaultProduct} onOpen={onOpen} update={updataData} addNew={addNewData} open={isOpen} />
      </TableContainer>
    </>
  )
}

export default Product