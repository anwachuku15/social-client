import React, { Component } from 'react'
import axios from 'axios';

// COMPONENTS
import Post from '../components/Post';
import Profile from '../components/Profile';

// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
  ...theme.spreadThis
})

class home extends Component {
	state = {
		posts: null
	}

	componentDidMount(){
		axios
			.get('/posts')
			.then(res => {
				this.setState({
					posts: res.data
				})
				console.log(res)
			})
			.catch(err => console.log(err));
	}
	render() {
		// const { classes } = this.props;

		let recentPostsMarkup = this.state.posts ? (
			this.state.posts.map(post => <Post post={post} key={post.postId}/>)
		) : <Grid>
					<Skeleton variant='rect' height={125}/>
					{/* <Skeleton variant="rect" height={125} width={200}/> */}
					{/* <Skeleton variant='text'/> */}
				</Grid> 
	
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

export default withStyles(styles)(home)
