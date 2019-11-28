import React, { Component } from "react";
import PropTypes from 'prop-types'
import { read } from './api-user'
import auth from '../auth/auth-helper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/styles"
import { Redirect, Link } from 'react-router-dom'
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import {listByUser} from '../post/api-post'
import ProfileTabs from './ProfileTabs'

const styles = theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.protectedTitle
    }
})

class Profile extends Component {
    constructor({ match }) {
        super()
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            posts: []
        }
        this.match = match
    }
    init = (userId) => {
        const jwt = auth.isAuthenticated()
        read({
            userId: userId
        }, { t: jwt.token }).then((data) => {
            if (data.error) {
                this.setState({ redirectToSignin: true })
            } else {
                let following = this.checkFollow(data)
                this.setState({ user: data, following: following })
                this.loadPosts(data._id)
            }
        })
    }
    componentWillReceiveProps = (props) => {
        this.init(props.match.params.userId)
    }
    componentDidMount = () => {
        this.init(this.match.params.userId)
    }
    checkFollow = (user) => {
        const jwt = auth.isAuthenticated()
        const match = user.followers.find((follower) => {
            return follower._id === jwt.user._id
        })
        return match
    }
    clickFollowButton = (callApi) => {
        const jwt = auth.isAuthenticated()
        callApi({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, this.state.user._id).then((data) => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ user: data, following: !this.state.following })
            }
        })
    }
    loadPosts = (user) => {
        const jwt = auth.isAuthenticated()
        listByUser({
            userId: user
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ posts: data })
            }
        })
    }
    removePost = (post) => {
        const updatedPosts = this.state.posts
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        this.setState({ posts: updatedPosts })
    }
    render() {
        const { classes } = this.props
        const photoUrl = this.state.user._id
            ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
            : '/api/users/defaultphoto'
        const redirectToSignin = this.state.redirectToSignin
        if (redirectToSignin)
            return <Redirect to='/signin' />
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    Profile
            </Typography>
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={photoUrl} className={classes.bigAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary={this.state.user.name} secondary={this.state.user.email} /> {
                            auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id
                                ? (<ListItemSecondaryAction>
                                    <Link to={"/user/edit/" + this.state.user._id}>
                                        <IconButton aria-label="Edit" color="primary">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <DeleteUser userId={this.state.user._id} />
                                </ListItemSecondaryAction>)
                                : (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton} />)
                        }
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={this.state.user.about} secondary={"Joined: " + (
                            new Date(this.state.user.created)).toDateString()} />
                    </ListItem>
                </List>
                <ProfileTabs user={this.state.user} posts={this.state.posts} removePostUpdate={this.removePost} />
            </Paper>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)