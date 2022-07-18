import { TableCell } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';

const PostTableHeaderCell = ({ onSort, titleIcon }) => {
  const style = {
    transform: titleIcon ? 'rotate(180deg)' : '',
    transition: 'transform 150ms ease',
  }

  return (
    <>
      <TableCell>
        <Button variant="outlined" onClick={() => onSort("Title")}> Title <ArrowUpwardIcon sx={{ fontSize: 16 }} style={style} /></Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="outlined" onClick={() => onSort("Description")}> Description <ArrowUpwardIcon sx={{ fontSize: 16 }} /></Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="outlined" onClick={() => onSort("Price")}> Price <ArrowUpwardIcon sx={{ fontSize: 16 }} /></Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="outlined"> Product image </Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="outlined"> Edit </Button>
      </TableCell>
    </>
  )
}

export default PostTableHeaderCell