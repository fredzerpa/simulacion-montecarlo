import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Form from './components/form/form.component';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css'
import LogBox from './components/log-box/log-box.component';

const getGameResults = (games = []) => {
  if (!games.length) return { won: 0, lost: 0, plays: 0, total: 0 }

  return games.reduce((result, diceNums) => {
    const dieOne = diceNums[0];
    const dieTwo = diceNums[1];

    dieOne === dieTwo ? result.won += dieOne * dieTwo * 100 : result.lost -= 200;

    result.plays += 1;
    result.total = result.won + result.lost;

    return result;
  }, { won: 0, lost: 0, plays: 0, total: 0 })
}

const App = () => {
  const theme = useTheme();
  const dices = useRef(null);
  const [isRolling, setIsRolling] = useState(false);
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

  const handleRoll = () => {
    setTimeout(() => {
      const currentDiceValues = dices.current.dice.map(die => die.state.currentValue);
      setLogs([...logs, currentDiceValues]);
      setIsRolling(false);
    }, 0);
  }

  const gameResults = getGameResults(logs);

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='column' justifyContent='space-between' sx={{ minHeight: '100vh', padding: '2rem 1rem' }} gap={2}>

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
              rollTime={2}
              defaultRoll={6}
              rollDone={handleRoll}
              disableIndividual
              ref={die => dices.current = die}
            />
          </Grid>
          <Grid item xs={12} container sx={{ maxWidth: '600px!important' }} m='auto'>
            <Grid item xs={12} container justifyContent='center'>
              <LogBox>
                {
                  !isRolling ?
                    (
                      logs.length ? (
                        logs.map((log, i) => {
                          const dieOne = log[0];
                          const dieTwo = log[1];
                          const won = dieOne === dieTwo;
                          return (
                            <Typography gutterBottom key={i}>
                              Sacaste {dieOne} y {dieTwo} -
                              <Typography component='span' color={won ? 'green' : 'red'} ml='5px'>
                                {won ? `Ganaste ${dieOne * dieTwo * 100}$` : 'Perdiste -200$'}
                              </Typography>
                            </Typography>
                          )
                        })
                      ) : null
                    ) : null
                }
              </LogBox>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6} sm={3} textAlign='center'>
                <Typography variant='button' fontSize='small'>
                  Jugado: {isRolling ? 0 : gameResults.plays}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign='center'>
                <Typography variant='button' fontSize='small'>
                  Perdido: {isRolling ? 0 : gameResults.lost}$
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign='center'>
                <Typography variant='button' fontSize='small'>
                  Ganado: {isRolling ? 0 : gameResults.won}$
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign='center'>
                <Typography variant='button' fontSize='small'>
                  Resultado: {isRolling ? 0 : gameResults.total}$
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Form */}
        <Grid item container xs={12}>
          <Form dicesRef={dices} logs={logs} setLogs={setLogs} isRolling={isRolling} setIsRolling={setIsRolling} />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

export default App;
