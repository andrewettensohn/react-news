import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getUserInfo } from '../Utilities/RestService';
import { UnixToYYYYMMdd } from '../Utilities/TimeHelper';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
                result.created = UnixToYYYYMMdd(result.created);
                setUserInfo(result)
            })
            .catch((err) => console.log(err));

    }, []);

    return (
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
                    {ReactHtmlParser(userInfo.about)}
                </Typography>
            </CardContent>
        </Card>
    );
}