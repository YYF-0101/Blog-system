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
    } else if (order === "asc") {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? -1 : 1;
    } else {
      return a[orderBy].toUpperCase() < b[orderBy].toUpperCase() ? 1 : -1;
    }
  }
}