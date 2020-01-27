import React, { Component } from 'react'
// import axios from 'axios';
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

// COMPONENTS
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

// Material-UI
import { useMediaQuery } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

const styles = (theme) => ({
	...theme.spreadThis,
	root: {
    flexGrow: 1,
	},
	container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
	},
	postShift: {
		'@media (max-width: 959px)': {
			maxHeight: '470px'
		}
	}
})

// const config = ConfigGenerator({ addOnsIncluded: true });
// config.setPrimarySidebarToInset();

class home extends Component {
	

	componentDidMount(){
		this.props.getPosts();
	}
	render() {
		// const isActive = useMediaQuery()

		const { classes } = this.props;
		const { posts, loading } = this.props.data;

		let recentPostsMarkup = !loading ? (
			posts.map(post => <Post post={post} key={post.postId} style={{minWidth:'175px'}}/>)
		) : 
				<div style={{margin:'auto', maxWidth:'10px'}}>
					<CircularProgress className={classes.progress} color='primary' />
				</div>
				
		return (
			<Container maxWidth='lg'>

				<Grid container spacing={8} >
					<Grid item lg={4} md={4} sm={4} xs={12} style={{paddingBottom:'3px'}}>
						<Profile />
					</Grid>

						<Grid item lg={8} md={8} sm={8} xs={12} >
							{recentPostsMarkup}
						</Grid>
				</Grid>

			</Container>
		)
	}
}

home.propTypes = {
	getPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

// state is basically defined in store.js
const mapStateToProps = (state) => ({
	data: state.data
})

const mapStateToActions = {
	getPosts
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(home))
