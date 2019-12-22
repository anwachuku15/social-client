import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

// COMPONENTS
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
// import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	...theme.spreadThis
})

class home extends Component {

	componentDidMount(){
		this.props.getPosts();
	}
	render() {
		const { classes } = this.props;
		const { posts, loading } = this.props.data;

		let recentPostsMarkup = !loading ? (
			posts.map(post => <Post post={post} key={post.postId}/>)
		) : 
				<div style={{margin:'auto', maxWidth:'10px'}}>
					<CircularProgress className={classes.progress} color='primary' />
				</div>
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentPostsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
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
