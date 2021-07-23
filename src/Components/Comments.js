import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getComments } from '../Utilities/RestService';
import { UnixToYYYYMMdd } from '../Utilities/TimeHelper';
import ReactHtmlParser from 'react-html-parser';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    pos: {
        marginBottom: 2,
    },
    header: {
        marginBottom: 3
    },
    loader: {
        marginTop: 5
    }
});

export default function Comment(props) {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);

        getComments(props.item.kids)
            .then((result) => setComments(result))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }, []);

    if (!isLoading && comments.length > 0) {
        return (
            <Box>
                {comments.map((comment) => {
                    if (comment.text) {
                        return (
                            <Card className={classes.pos}>
                                <CardContent>
                                    <Typography className={classes.header} variant="body2" color="textSecondary">
                                        {comment.by} - {UnixToYYYYMMdd(comment.time)}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {ReactHtmlParser(comment.text)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    }
                })}
            </Box>
        );
    } else {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="secondary"
                className={classes.loader}
            >
                <CircularProgress />
            </Box>
        );
    }
}