import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import BackImg from '../images/whitebackgroundimg.jpg';
// Material-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Collabo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  let history = useHistory();
  
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    // if(!email || !password) return;
    setLoading(true);
    const userData = {email, password};
    axios
      .post('/login', userData)
      .then(res => {
        console.log(res.data);
        console.log(userData);
        localStorage.setItem('fbIdToken', `Bearer ${res.data.token}`);
        const loginTime = new Date(jwtDecode(res.data.token).iat * 1000);
        const expDate = new Date(jwtDecode(res.data.token).exp * 1000);
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('expDate', expDate);
        setLoading(false);
        history.push('/');
      })
      .catch(err => {
        setErrors(err.response.data);
        setLoading(false);
      })
  }

  return (
    <Container component="main" maxWidth="xs" style={{background:`url(${BackImg})`, borderRadius: '50px'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            onChange={e => setEmail(e.target.value)} 
            helperText={errors.email}
						error={errors.email ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={e => setPassword(e.target.value)} 
            helperText={errors.password}
						error={errors.password ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {errors.general && (
            <Typography variant='body2' color='error' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
            {loading &&
              <CircularProgress className={classes.progress} color='secondary' size={30}/>
            }
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} style={{paddingBottom:'20px'}}>
        <Copyright />
      </Box>
    </Container>
  );
}