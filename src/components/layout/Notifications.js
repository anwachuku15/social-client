import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
// Material-UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatIcon from '@material-ui/icons/Chat';



const ITEM_HEIGHT = 48;

class Notifications extends Component {
  // anchorEl documentation
  // https://material-ui.com/components/menus/
  state = {
    anchorEl: null
  };
  handleOpen = e => {
    // target is the icon
    this.setState({ anchorEl: e.target });
  }
  handleClose = () => {
    this.setState({ anchorEl: null})
  }
  // sends req to backend to markAllNotificationsRead
  onMenuOpened = () => {
    let unreadNotificationsIds = 
      this.props.notifications
        .filter(notification => !notification.read)
        .map(notification => notification.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  }

  render() {
    dayjs.extend(relativeTime);

    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    
    let notificationIcon;
    let unread;

    if(notifications && notifications.length > 0){
      unread = notifications.filter(notification => notification.read === false)
      // console.log(unread.length)
      // if the user has any unread notifications...
      unread.length > 0 ? (
        notificationIcon = (
          <Badge badgeContent={unread.length} color='primary'>
            <NotificationsIcon />
          </Badge>
        )) : (
          notificationIcon = <NotificationsIcon />
        )
    } else {
      console.log(false)
      notificationIcon = <NotificationsIcon />
    }

    let notificationsMarkup = 
      // If user has notifications
      notifications && notifications.length > 0 ? (
        notifications.map(notification => {
          
          const action = notification.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? 'secondary' : 'primary';
          // if someone liked a post, show a ThumbUp icon
          const icon = notification.type === 'like' ? (
            <ThumbUpIcon color={iconColor} style={{ marginRight:10 }}/>
          ) : (
            // if someone commented on a post, show a chat icon
            <ChatIcon color={iconColor} style={{ marginRight:10 }}/>
          )

          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color='textPrimary'
                variant='body1'
                to={`/${notification.recipient}/post/${notification.postId}`}
              >
                {notification.sender} {action} your post {time}
              </Typography>
            </MenuItem>
          )
        })
      ) : ( // If user has no notifications
        <MenuItem onClick={this.handleClose}>
          You have no notifications.... yet
        </MenuItem>
      )

    return (
      <Fragment>
        <Tooltip placement='top' title='Notifications'>
          <IconButton 
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup='true'
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          style={{top:'25px', left:'20px'}}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5
            },
          }}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    )
  }
}


Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

const mapActionsToProps = {
  markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications);