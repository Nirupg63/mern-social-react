import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Publish from '@material-ui/icons/Publish'
import auth from '../auth/auth-helper'
import { read } from '../user/api-user'
import Card from '@material-ui/core/Card'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
})

class EditProfile extends Component {
    constructor({ match }) {
        super()
        this.state = {
            name: '',
            about: '',
            photo: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: ''
        }
        this.match = match
    }

    componentDidMount = () => {
        this.userData = new FormData()
        const jwt = auth.isAuthenticated()
        read({
            userId: this.match.params.userId
        }, { t: jwt.token }).then((data) => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ id: data._id, name: data.name, email: data.email, about: data.about })
            }
        })
    }

    handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        this.userData.set(name, value)
        this.setState({ [name]: value })
    }

    render() {
        const { classes } = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/user/' + this.state.id} />)
        }
        return (
            <Card className={classes.card}>
                <TextField
                    id="multiline-flexible"
                    label="About"
                    multiline
                    rows="2"
                    value={this.state.about}
                    onChange={this.handleChange('about')}
                />
                <label htmlFor="icon-button-file">
                    <Button variant="raised" color="default" component="span">
                        Upload <Publish />
                    </Button>
                </label>
                <input accept="image/*"
                    type="file"
                    onChange={this.handleChange('photo')}
                    style={{ display: 'none' }}
                    id="icon-button-file" />
            </Card>
        )
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)