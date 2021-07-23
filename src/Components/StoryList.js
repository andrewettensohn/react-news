import React, { useState, useEffect } from "react";
import StoryRow from './StoryRow'
import { getStories } from '../Utilities/RestService';
import {
    Table,
    TableBody,
    TableContainer,
    Box,
    Paper,
    CircularProgress,
    Grid,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';

export default function StoryList() {
    const [stories, setStories] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setPageNum(1);
        setIsLoading(true);

        getStories(pageNum)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));


        setIsLoading(false);
    }, []);

    const handlePage = (event, value) => {

        setPageNum(value);
        setIsLoading(true);

        getStories(value)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));

        setIsLoading(false);
    };

    if (stories.length > 0 && !isLoading) {
        return (
            <Grid xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {stories.map((story) => (
                                <StoryRow key={story.id} story={story} />
                            ))}
                        </TableBody>
                    </Table>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Pagination count={50} onChange={handlePage} page={pageNum} shape="rounded" />
                    </Box>
                </TableContainer>
            </Grid>
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