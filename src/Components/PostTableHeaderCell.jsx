import { TableCell } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const PostTableHeaderCell = ({ onSort, titleIcon }) => {
  const style = {
    transform: titleIcon ? 'rotate(180deg)' : '',
    transition: 'transform 150ms ease',
  }

  return (
    <>
      <TableCell onClick={() => onSort("Title")}>
        Title
        <ArrowUpwardIcon sx={{ fontSize: 16 }} style={style} />
      </TableCell>
      <TableCell align="right" onClick={() => onSort("Description")}>
        Description
        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
      </TableCell>
      <TableCell align="right" onClick={() => onSort("Price")}>
        Price
        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
      </TableCell>
      <TableCell align="right">
        Product image
      </TableCell>
      <TableCell align="right">
        Edit
      </TableCell>
    </>
  )
}

export default PostTableHeaderCell