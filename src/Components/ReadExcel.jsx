import { Button } from "@mui/material"

const ExcellImportTool = ({ handleFile }) => {
  return (
    <>
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          accept="xlsx, xls"
          hidden
          onChange={(e) => { handleFile(e) }}
        />
      </Button>
    </>
  )
}

export default ExcellImportTool