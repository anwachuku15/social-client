import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CoolIcon from '../images/coolblue.png';
import BackImg from '../images/whitebackgroundimg.jpg';
// import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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


class login extends Component {
	
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			// loading: false,
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
		// this.setState({
		// 	loading: true
		// });
		const userData = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.loginUser(userData, this.props.history);
	}

	handleChange = (e) => {
		this.setState ({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;
		
		// if (token) {
    //   return <Redirect to="/" />;
    // }
		return (
			<Container component="main" maxWidth="xs" style={{background:`url(${BackImg})`, borderRadius: '50px'}}>
			{/* <Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm> */}
				<CssBaseline />
				<div className={classes.paper}>
					<img src={CoolIcon} alt='cool' className={classes.avatar} />
					{/* h1 good for SEO */}
					<Typography 
						component="h1" 
						variant='h5' 
						// className={classes.pageTitle}
					>
						Login
					</Typography>
					<form onSubmit={this.handleSubmit} noValidate>
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
							autoFocus
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
						{errors.general && (
							<Typography 
								variant='body2'
								// className={classes.customError}
							>
								{errors.general}
							</Typography>
						)}
						<Button 
							type='submit' 
							variant='contained' 
							color='secondary' 
							fullWidth
							// className={classes.button} 
							className={classes.submitButton} 
							disabled={loading}
						>
							Login
							{loading &&
								<CircularProgress className={classes.progress} color='primary' size={30}/>
							}
						</Button>
						<br/>
						<Grid container>
							<Grid item xs/>
							<Grid item style={{paddingBottom: '20px'}}>
								<Link href='/signup' variant='body2'>
									Don't have an account? Sign up
								</Link>
							</Grid>
						</Grid>
						{/* <small>Don't have an account? Sign up <Link to='/signup'>here</Link> </small> */}
					</form>
				{/* </Grid>
				<Grid item sm />
			</Grid> */}
				</div>
			</Container>
		)
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
