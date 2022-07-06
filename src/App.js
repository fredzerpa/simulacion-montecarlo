import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Form from './components/form/form.component';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css'
import LogBox from './components/log-box/log-box.component';

const App = () => {
  const theme = useTheme();
  const dices = useRef(null);
  const [logs, setLogs] = useState([]);

  theme.typography = {
    ...theme.typography,
    h1: {
      ...theme.typography.h1,
      fontSize: '3rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '4rem'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '5rem'
      }
    },
    h2: {
      ...theme.typography.h2,
      fontSize: '2rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '4rem',
      },
    }
  };

  useEffect(() => {
    console.log({ logs })
  }, [logs])

  const handleRoll = (total, diceValues) => {
    console.log(diceValues);
    setTimeout(() => {
      const currentDiceValues = dices.current.dice.map(die => die.state.currentValue);
      setLogs([...logs, currentDiceValues]);
    }, 0);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='column' justifyContent='space-between' sx={{ minHeight: '100vh', padding: '2rem' }} gap={2}>

        {/* Title */}
        <Grid item container xs={12} mb={3}>
          <Grid item xs={12}>
            <Typography align='center' variant='h1'>Simulacion de Monte Carlo</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' variant='h2'>Distribucion Uniforme</Typography>
          </Grid>
        </Grid>

        {/* Dices */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} wrap='nowrap' container justifyContent='center' sx={{ paddingLeft: 0 }} >
            <ReactDice
              numDice={2}
              dotColor='black'
              faceColor='white'
              outline
              outlineColor='black'
              dieSize={100}
              margin={10}
              rollTime={1}
              defaultRoll={6}
              rollDone={handleRoll}
              // rollDone={(total, diceValues) => setLogs([...logs, diceValues])}
              disableIndividual
              ref={die => dices.current = die}
            />
          </Grid>
          <Grid item xs={12} container justifyContent='center'>
            <LogBox logData={''} />
          </Grid>
        </Grid>

        {/* Form */}
        <Grid item container xs={12}>
          <Form dicesRef={dices} />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

export default App;
