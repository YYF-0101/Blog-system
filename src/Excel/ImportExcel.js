import * as XLSX from 'xlsx'
import { Button } from '@mui/material'

const ImportExcel = ({ Products, setProducts }) => {

  const handleRequestImport = e => {
    const uploadedFile = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(uploadedFile)
    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const workbook = XLSX.read(bufferArray, { type: "buffer" })
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
      const SliceRows =
        data.slice(1).map((r) => r.reduce((acc, x, i) => {
          acc[data[0][i]] = x;
          return acc;
        }, {}))
      setProducts(SliceRows.map((pro) => pro), ...Products)
    }
  }

  return (
    <Button sx={{ ml: 2 }} variant="outlined" component="label">
      Upload File
      <input type="file" accept="xlsx, xls" hidden
        onChange={(e) => { handleRequestImport(e) }}
      />
    </Button>
  )
}

export default ImportExcel