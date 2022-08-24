import { useState, useEffect } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../services'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { TablePagination } from '@mui/material'
import PostTableHeaderCell from '../Components/PostTableHeaderCell'
import PostTableCell from '../Components/PostTableCell'
import ImportExcel from '../Excel/ImportExcel'
import ExportExcel from '../Excel/ExportExcel'

const Product = ({ searchedValue, setSearchedValue, setInputValue }) => {
  const [DefaultProducts, setDefaultProducts] = useState([])
  const [tableCellEdit, setTableCellEdit] = useState({})
  const [Products, setProducts] = useState([])
  // const [isOpen, setIsOpen] = useState(false)
  const [editNum, setEditNum] = useState("")
  const [productsOpacity, setProductsOpacity] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [picture, setPicture] = useState(null)
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  let formData = new FormData()
  const defaultProduct = {
    id: null,
    title: null,
    description: null,
    price: null,
    product_image: null,
    category_id: null,
  }

  useEffect(() => {
    apiGet('products').then(res => {
      const resData = res.data.sort(function (a, b) {
        return b.id - a.id
      })
      setDefaultProducts(resData)
      setProducts(resData)
    })
  }, [])

  useEffect(() => {
    setProducts(DefaultProducts.filter(product => {
      if (searchedValue === '') {
        return product;
      } else if (product.title && searchedValue && product.title.toLowerCase().includes(searchedValue.toLowerCase())) {
        return product;
      } else if (product.description && searchedValue && product.description.toLowerCase().includes(searchedValue.toLowerCase())) {
        return product;
      }
    }))
  }, [searchedValue])

  const onDelet = (id) => {
    apiDelete(`product/${id}`).then(res => res.data && setProducts(Products.filter((product) => product.id !== id)))
  }


  const updataData = data => {
    formData.append("id", data.id)
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    if (picture) {
      formData.append('product_image', picture)
    } else {
      formData.append('product_image', data.product_image)
    }
    formData.append('_method', 'put')

    apiPut(`product/${data.id}`, formData).then(res => {
      onSuccess(res.data)
    })
  }

  const onSuccess = data => {
    setEditNum('')
    setProductsOpacity(!productsOpacity)
    setProducts(Products.map((product) => product.id === data.id ? data : product))
  }

  const creatProduct = prod => {
    const data = { ...prod, category_id: 99 }
    apiPost('products', data).then(res => {
      setDefaultProducts([res.data, ...DefaultProducts.filter((prod) => prod.title)])
      setEditNum('')
      setProductsOpacity(!productsOpacity)
      setInputValue("")
      setSearchedValue("")
    })
  }

  const onToggle = id => {
    setEditNum(id)
    setProductsOpacity(!productsOpacity)
  }

  const onCancel = () => {
    setEditNum('')
    setProductsOpacity(!productsOpacity)
    setProducts(DefaultProducts)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const onAdd = () => {
    setProducts(Products => [defaultProduct, ...Products])
    setEditNum(0)
    setProductsOpacity(!productsOpacity)
  }


  const deleteImg = (data) => {
    data.product_image && setProducts(Products.map((product) => product.id === data.id ? { ...product, "product_image": "" } : product))
    data.product_image && setTableCellEdit({ ...tableCellEdit, "product_image": null })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  return (
    <Box>
      {Products ?
        <Box sx={{ mt: 2, maxWidth: { xs: 450, sm: 550, md: 850, xl: 1250 }, ml: "auto", mr: "auto" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: productsOpacity ? "0.2" : "1" }}>
            <Button variant="outlined" onClick={() => onAdd()} >add<AddIcon /></Button>
            <Box sx={{ display: { xs: "flex" } }} >
              <ExportExcel Products={Products} />
              <ImportExcel Products={Products} setProducts={setProducts} />
            </Box>
          </Box>
          <Paper sx={{ mt: 3, width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 760, userSelect: "none" }} >
              <Table stickyHeader sx={{ borderRadius: 2, }} aria-label="sticky table">
                <TableHead sx={{ opacity: productsOpacity ? "0.2" : "1" }}>
                  <TableRow>
                    <PostTableHeaderCell handleRequestSort={handleRequestSort} orderBy={orderBy} order={order} />
                  </TableRow>
                </TableHead>
                <TableBody >
                  <PostTableCell products={Products} onDelet={onDelet} onToggle={onToggle} editNum={editNum} onCancel={onCancel} productsOpacity={productsOpacity} addNew={creatProduct} onUpdata={updataData} setPicture={setPicture} tableCellEdit={tableCellEdit} setTableCellEdit={setTableCellEdit} deleteImg={deleteImg} order={order} orderBy={orderBy} page={page} rowsPerPage={rowsPerPage} />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={Products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
          </Paper>
        </Box> :
        <div>No products</div>}
    </Box >
  )
}

export default Product
/*
// const [dialogData, setDialogData] = useState("")

//const onOpen = (prod) => {
//setIsOpen(!isOpen)
//prod && setDialogData(prod)}

//dialog add button

< IconButton sx = {{ mr: 2 }} onClick = {() => onOpen(defaultProduct)} > <AddIcon />
</ >

//<ProductDialog dialogData={dialogData.id ? dialogData : defaultProduct} onOpen={onOpen} update={updataData} addNew={creatProduct} open={isOpen} />

//search
<Box sx={{ minWidth: { xs: 150, md: 350 } }}>
<form onSubmit={submitSearchForm}>
  <TextField
    placeholder="Search Title and Description"
    type="search"
    variant="outlined"
    fullWidth
    size="small"
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={submitSearchForm}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      )
    }}
    onChange={e => setSearch(e.target.value)} />
</form>
</Box>
*/