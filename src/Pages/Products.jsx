import { useState, useEffect } from 'react'
import ProductDialog from '../Components/ProductDialog'
import PostTableHeaderCell from '../Components/PostTableHeaderCell'
import { request } from '../Resources/Interceptor'
import PostTableCell from '../Components/PostTableCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, Button } from '@mui/material'
import { InputAdornment } from '@mui/material'
import { TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { TablePagination } from '@mui/material';
import * as XLSX from 'xlsx'

const Product = () => {
  const [DefaultProducts, setDefaultProducts] = useState([])
  const [sorting, setSorting] = useState(false)
  const [transformIcon, setTransformIcon] = useState("")
  const [Products, setProducts] = useState([])
  const [search, setSearch] = useState('search')
  const [isOpen, setIsOpen] = useState(false)
  const [dialogData, setDialogData] = useState("")
  const [editNum, setEditNum] = useState("")
  const [productsOpacity, setProductsOpacity] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([])
  const defaultProduct = {
    id: null,
    title: null,
    description: null,
    price: null,
    product_image: null,
    category_id: null,
  }

  useEffect(() => {
    request({ url: '/products' })
      .then(response => {
        setDefaultProducts(response.data)
        setProducts(response.data.sort(function (a, b) {
          return b.id - a.id
        }))
      })
      .catch(error => console.log(error))
  }, [editNum])

  const onDelet = (id) => {
    setProducts(Products.filter((product) => product.id !== id))
  }

  const onSuccess = data => {
    setProducts(Products
      .filter((prod) => prod.title)
      .map((product) => product.id === data.id ? data : product))
  }

  const onSort = (cell) => {
    setSorting(!sorting)
    switch (true) {

      case cell === "Title" && sorting === false:
        setProducts([...Products].sort(function (a, b) {
          return a.title?.localeCompare(b.title)
        }))
        setTransformIcon("Title")
        break;

      case cell === "Title" && sorting === true:
        setProducts([...Products].sort(function (a, b) {
          return b.title?.localeCompare(a.title)
        }))
        setTransformIcon("Title")
        break;

      case cell === "Description" && sorting === false:
        setProducts([...Products].sort(function (a, b) {
          return a.description?.localeCompare(b.description)
        }))
        setTransformIcon("Description")
        break;

      case cell === "Description" && sorting === true:
        setProducts([...Products].sort(function (a, b) {
          return b.description?.localeCompare(a.description)
        }))
        setTransformIcon("Description")
        break;

      case cell === "Price" && sorting === false:
        setProducts([...Products].sort(function (a, b) {
          return a.price - b.price
        }))
        setTransformIcon("Price")
        break;

      case cell === "Price" && sorting === true:
        setProducts([...Products].sort(function (a, b) {
          return b.price - a.price
        }))
        setTransformIcon("Price")
        break;

      default:
        console.log("wrong click")
        break;
    }
  }

  const submitSearchForm = (e) => {
    e.preventDefault()

    setProducts(DefaultProducts.filter(product => {
      if (search === '') {
        return product;
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
    request({ url: `/${prod.id}`, method: 'put', data: prod })
      .then(res => {
        onSuccess(res.data)
        setIsOpen(false)
        setEditNum('')
      })
      .catch(error => console.error('There was an error!', error));
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

  const creatProduct = (prod) => {
    const data = { ...prod, category_id: 99 }
    request({ url: '/products', method: 'post', data: data })
      .then(res => {
        setIsOpen(false)
        onSuccess(res.data)
        setEditNum('')
        setProductsOpacity(!productsOpacity)
      })
      .catch(error => console.error('There was an error!', error));

  }

  const onToggle = (id) => {
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

  const SliceProducts =
    Products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleOnExport = () => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(Products)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx");
  }

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadedFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, { type: "buffer" })
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
      setRows(data.slice(1).map((r) => r.reduce((acc, x, i) => {
        acc[data[0][i]] = x;
        return acc;
      }, {})))

      Products.push.apply(Products, rows)
    }
  }

  return (
    <Box>
      <Box sx={{ mt: 2, maxWidth: { xs: 450, sm: 550, md: 850, xl: 1250 }, ml: "auto", mr: "auto" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: productsOpacity ? "0.2" : "1" }}>
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
          <Box sx={{ display: { xs: "flex" } }} >
            <IconButton sx={{ mr: 2 }} onClick={() => onOpen(defaultProduct)} ><AddIcon />
            </IconButton>
            <Button variant="outlined" onClick={() => onAdd()} >ADD NEW</Button>
          </Box>
        </Box>
        <Paper sx={{ mt: 3, width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 560, }} >
            <Table stickyHeader sx={{ borderRadius: 2 }} aria-label="sticky table">
              <TableHead sx={{ opacity: productsOpacity ? "0.2" : "1" }}>
                <TableRow>
                  <PostTableHeaderCell onSort={onSort} Icon={transformIcon} />
                </TableRow>
              </TableHead>
              <TableBody >
                <PostTableCell products={SliceProducts} onOpen={onOpen} onDelet={onDelet} onToggle={onToggle} editNum={editNum} onCancel={onCancel} update={updataData} productsOpacity={productsOpacity} addNew={creatProduct} />
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
          <ProductDialog dialogData={dialogData.id ? dialogData : defaultProduct} onOpen={onOpen} update={updataData} addNew={creatProduct} open={isOpen} />
        </Paper>
        <Box sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleOnExport}>Export</Button>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              accept="xlsx, xls"
              hidden
              onChange={(e) => { handleFile(e) }}
            />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export default Product