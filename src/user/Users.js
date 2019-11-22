import { Component } from "react"
import Person from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { list } from "./api-user"
import {Link} from 'react-router-dom'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core'


class Users extends Component {
    state = { users: [] }

    componentDidMount = () => {
        list().then((data) => {
            if(data.error)
                console.log(data.error)
            else
                this.setState({users: data})
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Users
                </Typography>
                <List dense>
                    {this.state.users.map(function(item, i) {
                        return <Link to={"/user/" + item._id} key={i}>
                            <ListItem button="button">
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward/>
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