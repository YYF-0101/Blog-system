import { TableCell } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState } from "react";

const PostTableHeaderCell = ({ onSort, Icon }) => {

  const [state, setState] = useState(false)

  return (
    <>
      <TableCell onClick={() => {
        onSort("Title")
        setState(!state)
      }
      }>
        Title
        <ArrowUpwardIcon sx={{
          fontSize: 16,
          transform: Icon === "Title" && state ? 'rotate(180deg)' : "",
          transition: 'transform 150ms ease',
        }} />
      </TableCell>
      <TableCell align="right" onClick={() => {
        onSort("Description")
        setState(!state)
      }}>
        Description
        <ArrowUpwardIcon sx={{
          fontSize: 16,
          transform: Icon === "Description" && state ? 'rotate(180deg)' : "",
          transition: 'transform 150ms ease',
        }} />
      </TableCell>
      <TableCell align="right" onClick={() => {
        onSort("Price")
        setState(!state)
      }}>
        Price
        <ArrowUpwardIcon sx={{
          fontSize: 16,
          transform: Icon === "Price" && state ? 'rotate(180deg)' : "",
          transition: 'transform 150ms ease',
        }} />
      </TableCell>
      <TableCell align="right">
        Product Image
      </TableCell>
      <TableCell align="right">
        Action
      </TableCell>
    </>
  )
}

export default PostTableHeaderCell