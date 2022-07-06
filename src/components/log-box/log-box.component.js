import { Box } from "@mui/system";

const LogBox = ({logData=''}) => {

  return (
    <Box
      component='textarea'
      width={500}
      height={200}
      padding='1rem'
      readOnly
      style={{ resize: 'none' }}
      placeholder='Registros de la simulacion'
      value={logData}
    >
    </Box>
  )
}

export default LogBox;