import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';

const recursive = (data, log, iteration) => {
  const newLog = [...log, data];
  return iteration ? recursive(data, newLog, iteration - 1) : log;
}

const Form = ({ dicesRef }) => {
  const [simulating, setSimulating] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!simulating || true) {
      const data = new FormData(event.currentTarget);
      const iterations = Number(data.get('iterations'));

      setSimulating(true);
      for (let iteration = 0; iteration < iterations; iteration++) {
        dicesRef.current.rollAll();
      }
      setSimulating(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mb={2}>
          Definir Distribucion
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} width='100%'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="iterations"
                name="iterations"
                type='number'
                required
                fullWidth
                id="iterations"
                label="# Iteraciones"
                defaultValue={1}
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Comenzar Simulacion
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Form;