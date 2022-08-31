import { headCells } from "../utils"
import { TableCell } from "@mui/material"
import Box from '@mui/material/Box'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

const PostTableHeaderCell = ({ handleRequestSort, order, orderBy }) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  }

  return (
    <>
      {
        headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {index < 3 ?
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
              :
              <p>{headCell.label}</p>}
          </TableCell>
        ))
      }
    </>


    // <>
    //   <TableCell onClick={() => {
    //     onSort("Title")
    //     setState(!state)
    //   }
    //   }>
    //     Title
    //     <ArrowUpwardIcon sx={{
    //       fontSize: 16,
    //       transform: Icon === "Title" && state ? 'rotate(180deg)' : "",
    //       transition: 'transform 150ms ease',
    //     }} />
    //   </TableCell>
    //   <TableCell align="right" onClick={() => {
    //     onSort("Description")
    //     setState(!state)
    //   }}>
    //     Description
    //     <ArrowUpwardIcon sx={{
    //       fontSize: 16,
    //       transform: Icon === "Description" && state ? 'rotate(180deg)' : "",
    //       transition: 'transform 150ms ease',
    //     }} />
    //   </TableCell>
    //   <TableCell align="right" onClick={() => {
    //     onSort("Price")
    //     setState(!state)
    //   }}>
    //     Price
    //     <ArrowUpwardIcon sx={{
    //       fontSize: 16,
    //       transform: Icon === "Price" && state ? 'rotate(180deg)' : "",
    //       transition: 'transform 150ms ease',
    //     }} />
    //   </TableCell>
    //   <TableCell align="right">
    //     Product Image
    //   </TableCell>
    //   <TableCell align="right">
    //     Action
    //   </TableCell>
    // </>
  )
}

export default PostTableHeaderCell