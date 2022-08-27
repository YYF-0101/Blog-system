import * as XLSX from 'xlsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const ExportExcel = ({ Products }) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx");
  }
  return (
    <Box sx={{
      display: "flex",
    }}>
      <p> Export Excel</p>
      <IconButton
        sx={{ px: 1.5 }}
        onClick={() => handleOnExport(Products)}>
        <FileDownloadIcon />
      </IconButton >
    </Box>
    // Export
    // <Button variant="outlined" onClick={() => handleOnExport(Products)}>Export</Button>
  )
}

export default ExportExcel