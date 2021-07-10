import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from '../../components/Navbar'
import RegulatorNavbar from '../../components/RegulatorNavbar'
import useStyles from './styles';

const Home = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <RegulatorNavbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h4" variant="h4">
            Your resources
          </Typography>
        </Container>
        <Box mt={5}>
        </Box>
      </main>
    </div>
  )
}

export default Home