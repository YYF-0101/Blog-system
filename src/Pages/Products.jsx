import { useState, useEffect } from 'react'
import PostTableHeaderCell from '../Components/PostTableHeaderCell'
import { apiDelete, apiGet, apiPost, apiPut } from '../services'
import PostTableCell from '../Components/PostTableCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import { TablePagination } from '@mui/material';
import * as XLSX from 'xlsx'

const Product = ({ searchedValue, setSearchedValue, setInputValue }) => {
  const [DefaultProducts, setDefaultProducts] = useState([])
  const [tableCellEdit, setTableCellEdit] = useState({})
  const [sorting, setSorting] = useState(false)
  const [transformIcon, setTransformIcon] = useState("")
  const [Products, setProducts] = useState([])
  // const [isOpen, setIsOpen] = useState(false)
  const [editNum, setEditNum] = useState("")
  const [productsOpacity, setProductsOpacity] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([])
  const [picture, setPicture] = useState(null)
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

  let formData = new FormData()
  const updataData = (data) => {
    formData.append("id", data.id)
    formData.append("title", data.title === "" ? "null" : data.title)
    formData.append("description", data.description === "" ? "null" : data.description)
    formData.append("price", data.price)
    formData.append('_method', 'put')
    if (picture) {
      formData.append('product_image', picture)
    }

    apiPut(`product/${data.id}`, formData).then(res => {
      console.log(res.data)
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

  const SliceProducts =
    Products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleOnExport = () => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(Products)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx");
  }

  const handleFile = e => {
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

  const deleteImg = (data) => {
    data.product_image && setProducts(Products.map((product) => product.id === data.id ? { ...product, ["product_image"]: "" } : product))
    data.product_image && setTableCellEdit({ ...tableCellEdit, ["product_image"]: "" })
  }

  return (
    <Box>
      {Products ?
        <Box sx={{ mt: 2, maxWidth: { xs: 450, sm: 550, md: 850, xl: 1250 }, ml: "auto", mr: "auto" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: productsOpacity ? "0.2" : "1" }}>
            <Button variant="outlined" onClick={() => onAdd()} >add<AddIcon /></Button>
            <Box sx={{ display: { xs: "flex" } }} >
              <Button variant="outlined" onClick={handleOnExport}>Export</Button>
              <Button sx={{ ml: 2 }} variant="outlined" component="label">Upload File
                <input type="file" accept="xlsx, xls" hidden
                  onChange={(e) => { handleFile(e) }}
                />
              </Button>
            </Box>
          </Box>
          <Paper sx={{ mt: 3, width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 760, userSelect: "none" }} >
              <Table stickyHeader sx={{ borderRadius: 2, }} aria-label="sticky table">
                <TableHead sx={{ opacity: productsOpacity ? "0.2" : "1" }}>
                  <TableRow>
                    <PostTableHeaderCell onSort={onSort} Icon={transformIcon} />
                  </TableRow>
                </TableHead>
                <TableBody >
                  <PostTableCell products={SliceProducts} onDelet={onDelet} onToggle={onToggle} editNum={editNum} onCancel={onCancel} productsOpacity={productsOpacity} addNew={creatProduct} onUpdata={updataData} setPicture={setPicture} tableCellEdit={tableCellEdit} setTableCellEdit={setTableCellEdit} deleteImg={deleteImg} />
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