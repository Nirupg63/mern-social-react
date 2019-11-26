import React, { Component } from "react"
import PropTypes from 'prop-types'
import Person from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { withStyles } from '@material-ui/core/styles'
import { list } from "./api-user"
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing,
        margin: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
})
class Users extends Component {
    state = { users: [] }

    componentDidMount = () => {
        list().then((data) => {
            if (data.error)
                console.log(data.error)
            else
                this.setState({ users: data })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Users
                </Typography>
                <List dense>
                    {this.state.users.map(function (item, i) {
                        return <Link to={"/user/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item.email} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })}
                </List>
            </Paper>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Users)