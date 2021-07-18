import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import StoryCard from './StoryCard'
import { getStories } from '../Utilities/RestService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    pagingBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default function StoryList() {
    const classes = useStyles();
    const [stories, setStories] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        setPageNum(1);

        getStories(pageNum)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));

            console.log(stories)

            setIsLoading(false);
    }, []);

    const handlePage = (event, value) => {
        setPageNum(value);
    
        getStories(pageNum)
        .then((result) => setStories(result))
        .catch((err) => console.log(err));

        console.log(stories)
      };

    if(!isLoading){
        return (
            <Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                        {stories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                        </TableBody>
                    </Table>
                    <Pagination count={50} onChange={handlePage} shape="rounded" />
                </TableContainer>
            </Container>
        );
    } else {
        return (
            <p>Loading...</p>
        );
    }
}