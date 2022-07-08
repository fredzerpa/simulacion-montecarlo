import { Box } from "@mui/system";

const LogBox = ({children}) => {

  return (
    <Box
      component='div'
      sx={{
        border: '1px solid black',
        padding: '1rem',
        width: '100%',
        height: '200px',
        overflowY: 'scroll'
      }}
    >
      {children}
    </Box>
  )
}

export default LogBox;