import * as XLSX from 'xlsx'
import { Button } from '@mui/material'

const ExportExcel = ({ Products }) => {
  const handleOnExport = products => {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(products)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")

    XLSX.writeFile(workbook, "luxdream.xlsx");
  }
  return (
    <Button variant="outlined" onClick={() => handleOnExport(Products)}>Export</Button>
  )
}

export default ExportExcel