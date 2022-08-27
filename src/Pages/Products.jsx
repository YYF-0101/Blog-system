import { useState, useEffect } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../services'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { TablePagination } from '@mui/material'
import PostTableHeaderCell from '../Components/PostTableHeaderCell'
import PostTableCell from '../Components/PostTableCell'
import ImportExcel from '../Excel/ImportExcel'
import ExportExcel from '../Excel/ExportExcel'
import AddNewTableCell from '../Components/AddNewTableCell'

const Product = ({ searchedValue, setSearchedValue, setInputValue }) => {
  const [DefaultProducts, setDefaultProducts] = useState([])
  const [Products, setProducts] = useState([])
  const [rollEdit, setRollEdit] = useState("")
  const [productsOpacity, setProductsOpacity] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [picture, setPicture] = useState(null)
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  const [onAddNew, setOnAddNew] = useState(false)
  let formData = new FormData()

  useEffect(() => {
    apiGet('products').then(res => {
      const resData = res.data.sort(function (a, b) {
        return b.id - a.id
      })
      setDefaultProducts(resData)
      setProducts(resData)
      setSearchedValue('')
    })
  }, [])

  useEffect(() => {
    setPage(0)
    setProducts(DefaultProducts.filter(product => {
      if (searchedValue === '') {
        return product;
      } else if (product.title && searchedValue && product.title.toLowerCase().includes(searchedValue.toLowerCase())) {
        return product;
      } else if (product.description && searchedValue && product.description.toLowerCase().includes(searchedValue.toLowerCase())) {
        return product;
      }
    }))
  }, [searchedValue, DefaultProducts])

  const onDelet = (id) => {
    apiDelete(`product/${id}`).then(res => {
      setDefaultProducts(DefaultProducts.filter((product) => product.id !== id))
      setSearchedValue('')
    })
  }

  const handleData = data => {
    data.id && formData.append('id', data.id)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price', data.price)
    if (picture) {
      formData.append('product_image', picture)
    }
    if (Products.filter((p) => p.id === data.id).length < 1) {
      formData.append('category_id', "99")
      creatProduct(formData)
    } else {
      formData.append('_method', 'put')
      apiPut(`product/${data.id}`, formData).then(res => {
        onSuccess(res.data)
      })
    }
  }

  const onSuccess = data => {
    setRollEdit('')
    setProductsOpacity(!productsOpacity)
    setProducts(Products.map((product) => product.id === data.id ? data : product))
  }

  const creatProduct = prod => {
    setOnAddNew(!onAddNew)
    apiPost('products', prod).then(res => {
      setDefaultProducts([res.data, ...DefaultProducts])
      setRollEdit('')
      setProductsOpacity(!productsOpacity)
      setInputValue('')
      setSearchedValue('')
      setPicture('')
      setPage(0)
    })
  }

  const onToggle = id => {
    setRollEdit(id)
    setProductsOpacity(!productsOpacity)
  }

  const onCancel = () => {
    setRollEdit('')
    setProductsOpacity(!productsOpacity)
    setProducts(Products.filter((prod) => prod.title))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const onAdd = () => {
    setOnAddNew(!onAddNew)
    setProductsOpacity(!productsOpacity)
  }

  const deleteImg = data => {
    data.product_image && setProducts(Products.map((product) => product.id === data.id ? { ...product, "product_image": "" } : product))
    // data.product_image && setTableCellEdit({ ...tableCellEdit, "product_image": null })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  return (
    <Box>
      {Products ?
        <Box sx={{ mt: 2, maxWidth: { xs: 450, sm: 550, md: 1050, xl: 1450 }, ml: "auto", mr: "auto", userSelect: "none" }}>
          <Box sx={{ fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: productsOpacity ? "0.2" : "1" }}>
            <Box sx={{ display: 'flex' }} ><p>Add New</p><IconButton variant="outlined" onClick={() => onAdd()} sx={{ px: 1.5 }}><AddIcon /></IconButton></Box>
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
                  {onAddNew && <AddNewTableCell setPicture={setPicture} addNew={handleData} onAdd={onAdd}></AddNewTableCell>}
                  <PostTableCell products={Products} onDelet={onDelet} onToggle={onToggle} editNum={rollEdit} onCancel={onCancel} productsOpacity={productsOpacity} onUpdata={handleData} setPicture={setPicture} deleteImg={deleteImg} order={order} orderBy={orderBy} page={page} rowsPerPage={rowsPerPage} />
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
        <div>No products</div>
      }
    </Box >
  )
}

export default Product