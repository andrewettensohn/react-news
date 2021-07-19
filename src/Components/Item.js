import React, { useState, useEffect } from "react";
import StoryRow from './StoryRow'
import { getSingleItem } from '../Utilities/RestService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Comments from './Comments'

export default function Item() {

    let params = new URLSearchParams(document.location.search.substring(1));
    let itemId = params.get("id");
    const [item, setItemInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);

        getSingleItem(itemId)
            .then((item) => setItemInfo(item))
            .catch((err) => console.log(err));

        setIsLoading(false);
    }, []);

    if (item.time && !isLoading) {
        return (
            <Box
                justifyContent="center"
                alignItems="center"
                color="secondary">
                <StoryRow story={item} />
                <Comments item={item} />
            </Box>
        );
    } else {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="secondary"
            >
                <CircularProgress />
            </Box>
        );
    }
}