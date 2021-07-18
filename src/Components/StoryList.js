import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import StoryCard from './StoryCard'
import { getTopStoryIds, getStories } from '../Utilities/RestService';

export default function StoryList() {
    const [stories, setStories] = useState([]);
    const [ids, setIds] = useState([]);
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {

        setPageNum(1);

        getTopStoryIds()
            .then((result) => setIds(result))
            .catch((err) => console.log(err));

        getStories(ids, pageNum)
            .then((result) => setStories(result))
            .catch((err) => console.log(err));

    }, []);

    return (
        <Container maxWidth="sm">
            {stories.map((story) => {
                return (<StoryCard key={story} story={story} />);
            })}
        </Container>
    );
}
