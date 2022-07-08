import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const getDiceRollNumbers = (numDice = 1, totalFaces = 6) => {

  const getRandomNumber = () => Math.floor(Math.random() * totalFaces) + 1;

  const result = [];

  for (let die = 0; die < numDice; die++) {
    result.push(getRandomNumber());
  }

  return result;
}

const Form = ({ dicesRef, logs, setLogs, isRolling, setIsRolling }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isRolling) {
      setIsRolling(true);

      const data = new FormData(event.currentTarget);
      const iterations = Math.floor(Number(data.get('iterations')));

      const gameRoll = [];
      // Starts at 1 because the dices will roll the last one
      for (let iteration = 1; iteration < iterations; iteration++) {
        // We have 2 dices
        gameRoll.push(getDiceRollNumbers(2));
      }
      // Only set the logs if it has any to add
      if (gameRoll.length) {
        setLogs(gameRoll);
      };
      dicesRef.current.rollAll();
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: 0 }}>
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