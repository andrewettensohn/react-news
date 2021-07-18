import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getUserInfo } from '../Utilities/RestService';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UserInfo() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({});

    let params = new URLSearchParams(document.location.search.substring(1));
    let userName = params.get("id");

    useEffect(() => {
        
        getUserInfo(userName)
            .then((result) => {
                result.created = new Date(result.created * 1000).toISOString().slice(0, 10);
                setUserInfo(result)
            })
            .catch((err) => console.log(err));

            console.log(userInfo)

    }, []);

    return (
        <Container>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2" color="textSecondary">
                        {userInfo.id}
                    </Typography>
                    <Typography color="textSecondary">
                        User Since: {userInfo.created}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Karma: {userInfo.karma}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {decodeAbout(userInfo.about)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Container>
    );
}

function decodeAbout(html) {
    if(html)
    {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
}