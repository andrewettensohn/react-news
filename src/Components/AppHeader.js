import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    h6: 'h2',
  },
  appBar: {
    backgroundColor: '#ff6600',
    maxHeight: 50,
    marginBottom: 10
  }
});

export default function AppHeader() {

  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacker News
        </Typography>
      </Toolbar>
    </AppBar>
  );

}