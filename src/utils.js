const days = 7
const now = new Date().getTime()
const setupTime = localStorage.getItem('setupTime')

export const Timer = () => {
  if (now - setupTime > days * 60 * 1000 * 60 * 24) {
    return true
  } else {
    return false
  }
}

export const auth = () => {
  if (localStorage.getItem('luxdream-yanfengYang-token')) {
    return true
  } else {
    return false
  }
}

export const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (b[orderBy] === a[orderBy]) {
      return 0;
    } else if (a[orderBy] == null || a[orderBy] === "") {
      return 1;
    } else if (b[orderBy] == null || b[orderBy] === "") {
      return -1;
    } else if (orderBy === "price") {
      if (order === "asc") {
        return parseInt(a[orderBy], 10) < parseInt(b[orderBy], 10) ? -1 : 1
      } else {
        return parseInt(b[orderBy], 10) > parseInt(a[orderBy], 10) ? 1 : -1
      }
    } else if (order === "asc" && orderBy !== "price") {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? -1 : 1;
    } else {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? 1 : -1;
    }
  }
}

export const headCells = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: true,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: true,
    label: 'Price ($)',
  },
  {
    id: 'product_image',
    numeric: true,
    label: 'Product image',
  },
  {
    id: 'action',
    numeric: true,
    label: 'Action',
  },
]

export const messageData = [
  {
    id: 'success',
    txt: 'You are successfully logged in',
    time: 4000,
    label: 'login'
  },
  {
    id: 'error',
    txt: 'You have entered an invalid username or password',
    time: 2000,
    label: 'Request failed with status code 401'
  },
  {
    id: 'error',
    txt: 'You are now logged out',
    time: 2000,
    label: 'logOut'
  },
  {
    id: 'error',
    txt: 'Login session expired',
    time: 2000,
    label: 'timeOut'
  },
  {
    id: 'success',
    txt: 'Deleted Success',
    time: 2000,
    label: 'delete-success'
  },
  {
    id: 'error',
    txt: 'Deleted Unsuccess',
    time: 2000,
    label: 'delete-unsuccess'
  },
  {
    id: 'success',
    txt: 'Export Success',
    time: 2000,
    label: 'export-success'
  },
  {
    id: 'success',
    txt: 'Import Success',
    time: 2000,
    label: 'import-success'
  },
  {
    id: 'success',
    txt: 'New Product Added',
    time: 2000,
    label: 'createdNew'
  },
  {
    id: 'error',
    txt: 'An error occurred. Failed to add new product',
    time: 2000,
    label: 'notCreatedNew'
  },
  {
    id: 'success',
    txt: 'Product change was successful',
    time: 2000,
    label: 'updated'
  },
  {
    id: 'error',
    txt: 'An error occurred. Failed to update product',
    time: 2000,
    label: 'notUpdated'
  },
]