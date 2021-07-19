import React, { useState, useEffect } from "react";
import StoryRow from './StoryRow'
import { getStories } from '../Utilities/RestService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default function StoryList() {
    const [stories, setStories] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 700;

    useEffect(() => {

        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);

        setPageNum(1);
        setIsLoading(true);

        getStories(pageNum)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));


        setIsLoading(false);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    const handlePage = (event, value) => {

        setPageNum(value);
        setIsLoading(true);

        getStories(pageNum)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));

        setIsLoading(false);
    };

    if (stories.length > 0 && !isLoading && width > breakpoint) {
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
                        <Pagination count={50} onChange={handlePage} shape="rounded" />
                    </Box>
                </TableContainer>
            </Grid>
        );
    } else if (stories.length > 0 && !isLoading && width < breakpoint) {
        return (
            <Grid xs={12}>
                <TableContainer component={Paper}>
                    <Table size="small">
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
                        <Pagination count={50} onChange={handlePage} shape="rounded" />
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