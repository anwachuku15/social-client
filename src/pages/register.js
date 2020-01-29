import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CoolIcon from '../images/coolblue.png';
import BackImg from '../images/whitebackgroundimg.jpg';
// import { Link } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

// Material-UI
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
	...theme.spreadThis,
	paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
	},
	form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitButton: {
		margin: theme.spacing(3, 0, 2),
	},
	avatar: {
    margin: theme.spacing(1),
		maxWidth: '40px'
  },
})


class signup extends Component {
	
	constructor(){
		super();
		this.state = {
			email: '',
      password: '',
      confirmPassword: '',
      handle: '',
			errors: {}
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors })
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
		}
		this.props.registerUser(newUserData, this.props.history);
	}

	handleChange = (e) => {
		this.setState ({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;
		return (
			<Container component="main" maxWidth="xs" style={{background:`url(${BackImg})`, borderRadius: '50px'}}>
			{/* <Grid container className={classes.form} maxWidth='xs'>
				<Grid item sm />
				<Grid item sm> */}
				<CssBaseline />
				<div className={classes.paper}>
					<img src={CoolIcon} alt='cool' className={classes.avatar} />
					<Typography component='h1' variant="h5" >
						Sign Up
					</Typography>
					<form onSubmit={this.handleSubmit} className={classes.form} noValidate>
						<TextField 
							id='handle' 
							name='handle' 
							type='text' 
							label='Username' 
							className={classes.textField}
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={this.state.handle} 
							onChange={this.handleChange} 
							fullWidth 
							variant="outlined"
							autoFocus
						/>
						<TextField 
							id='email' 
							name='email' 
							type='email' 
							label='Email' 
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email} 
							onChange={this.handleChange} 
							fullWidth 
							variant="outlined"
						/>
						<TextField 
							id='password' 
							name='password' 
							type='password' 
							label='Password' 
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password} 
							onChange={this.handleChange} 
							fullWidth 
							variant="outlined"
						/>
            <TextField 
							id='confirmPassword' 
							name='confirmPassword' 
							type='password' 
							label='Confirm Password' 
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword} 
							onChange={this.handleChange} 
							fullWidth 
							variant="outlined"
						/>
						{errors.general && (
							<Typography variant='body2' >
								{errors.general}
							</Typography>
						)}
						<Button 
							type='submit' 
							variant='contained' 
							color='primary' 
							fullWidth
							// className={classes.button} 
							className={classes.submitButton} 
							disabled={loading}
						>
							Sign Up
							{loading &&
								<CircularProgress className={classes.progress} color='secondary' size={30}/>
							}
						</Button>
						<br/>
						<Grid container>
							<Grid item xs/>
							<Grid item style={{paddingBottom: '20px'}}>
								<Link href='/login' variant='body2' color='secondary'>
									Already have an account? Login here
								</Link>
							</Grid>
						</Grid>
						
					</form>
				{/* </Grid>
				<Grid item sm />
			</Grid> */}
			</div>
			</Container>
		)
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
})

const mapActionsToProps = {
	registerUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
