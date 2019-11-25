import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import seashellImg from './../assets/images/seashell.jpg'
import {Link} from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing()
    },
    title: {
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            Home Page
          </Typography>
          <Link to="/users">Users</Link>
          <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the MERN Skeleton home page.
            </Typography>
          </CardContent>
        </Card>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
